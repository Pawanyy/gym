import nodemailer from 'nodemailer';
import logger from '../logger.js';
import EmailJob from './../models/EmailJob.js';

export default class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendEmail(jobId, { to, subject, text, html }) {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            text,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            await EmailJob.findByIdAndUpdate(jobId, { status: 'sent' });
            logger.info('Email sent:', info.response);
            return { success: true, info };
        } catch (error) {
            logger.error('Error sending email:', error);
            await EmailJob.findByIdAndUpdate(jobId, { status: 'failed' });
            return { success: false, error };
        }
    }
}
