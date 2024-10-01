const config = {
    apiPrefix: process.env.API_PREFIX || '/api',
    port: process.env.PORT || 5000,
    db: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
        debug: true,
    },
    corsOptions: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 200
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    muscleEnums: [
        'biceps',
        'triceps',
        'shoulder',
        'back',
        'chest',
        'legs',
        'push',
        'pull',
    ]
};

export default config;
