import jwt from 'jsonwebtoken';
import crypto from 'crypto';


export const generateToken = (user) => {

    const TOKEN_SECRET = process.env.JWT_SECRET || 'sampleSecret';
    const TOKEN_EXPIRY = parseInt(process.env.JWT_TOKEN_EXPIRY) || 3600;

    const authToken = jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
        },
        TOKEN_SECRET,
        { expiresIn: TOKEN_EXPIRY }
    );

    const createdAt = new Date(); // Current time
    const expiresIn = new Date(createdAt.getTime() + TOKEN_EXPIRY * 1000);

    return {
        token: authToken,
        tokenType: 'Bearer',
        createdAt: createdAt.toISOString(),
        expiresIn: expiresIn.toISOString(),
    };
};

export const generateResetToken = async (user) => {

    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 3600000;
    await user.save();


    return hashedToken;
}

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(new Error(err.message || 'Invalid token'));
            }
            resolve(decoded);
        });
    });
};

// Generic function to handle pagination and search using aggregation
export const paginateAndSearch = async (model, searchQuery = {}, page = 1, limit = 10, projection = null) => {
    const skip = (page - 1) * limit;

    const totalDocuments = await model.countDocuments(searchQuery);

    const pipeline = [
        { $match: searchQuery },
        { $skip: skip },
        { $limit: limit }
    ]

    if (projection) {
        pipeline.push({ $project: projection })
    }

    const documents = await model.aggregate(pipeline);

    return {
        documents,
        total: totalDocuments,
        page,
        totalPages: Math.ceil(totalDocuments / limit),
    };
};

export const aggregateWithPagination = async (model, pipeline, page, limit) => {
    const skip = (page - 1) * limit;

    // Aggregate pipeline for pagination
    const aggregationPipeline = [
        ...pipeline,
        { $skip: skip },
        { $limit: limit },
        {
            $facet: {
                documents: [ // Get paginated documents
                    { $skip: skip },
                    { $limit: limit }
                ],
                total: [ // Get the total count of documents
                    { $count: "total" }
                ]
            }
        }
    ];

    const result = await model.aggregate(aggregationPipeline).exec();

    // Total could be empty if no documents match
    const total = result[0]?.total[0]?.total || 0;
    const documents = result[0]?.documents || [];
    const totalPages = Math.ceil(total / limit);

    return { documents, total, page, totalPages };
};

