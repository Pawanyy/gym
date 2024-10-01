// Generic function to handle pagination and search
export const paginateAndSearch = async (model, query = {}, page = 1, limit = 10, projection = {}) => {
    const skip = (page - 1) * limit;
    const totalDocuments = await model.countDocuments(query);
    const documents = await model.find(query, projection).skip(skip).limit(limit);

    return {
        documents,
        totalRecords: totalDocuments,
        page,
        totalPages: Math.ceil(totalDocuments / limit),
    };
};

