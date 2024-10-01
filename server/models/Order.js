import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    interval: {
        type: String,
        enum: ['month', 'year', 'indefinite'],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true,
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
