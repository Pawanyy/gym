import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    price: { type: Number, required: true, },
    interval: {
        type: String,
        enum: ['month', 'year', 'indefinite'],
        required: true,
    },
    features: { type: [String], required: true, },
    isDeleted: { type: Boolean, default: false, index: true },
}, {
    timestamps: true
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
