import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    subject: { type: String, required: true, },
    email: { type: String, required: true, },
    message: { type: String, required: true, },
    isDeleted: { type: Boolean, default: false, index: true }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
