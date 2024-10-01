import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    height: {
        value: { type: Number, default: 0 },
        unit: { type: String, enum: ['cm', 'ft/in'], default: 'cm' },
    },
    weight: {
        value: { type: Number, default: 0 },
        unit: { type: String, enum: ['kg', 'lb'], default: 'kg' },
    },
    dob: { type: Date },
    phone: { type: String },
    lastLogin: { type: Date },
    role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
    profilePicture: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    address: { type: String },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'], default: 'Unknown' },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    isDeleted: { type: Boolean, default: false, index: true }
}, {
    timestamps: true,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
