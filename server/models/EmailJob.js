import mongoose from 'mongoose';

const emailJobSchema = new mongoose.Schema({
    service: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String },
    html: { type: String },
    status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
    isDeleted: { type: Boolean, default: false, index: true }
}, {
    timeseries: true
});

const EmailJob = mongoose.model('EmailJob', emailJobSchema, "email_jobs");
export default EmailJob;
