import MailService from './mailService.js';
import EmailJob from './../models/EmailJob.js';

class EmailQueue {
    constructor() {
        if (!EmailQueue.instance) {
            this.mailService = new MailService();
            this.isProcessing = false;
            EmailQueue.instance = this;
        }
        return EmailQueue.instance;
    }

    async add(emailData) {
        const job = await EmailJob.create(emailData);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;

        while (true) {
            const job = await EmailJob.findOne({ status: 'pending' }).sort({ createdAt: 1 });

            if (!job) {
                this.isProcessing = false;
                break;
            }

            await this.mailService.sendEmail(job._id, job); // Process the job
        }
    }
}

// Create a single instance of EmailQueue
const emailQueue = new EmailQueue();
export default emailQueue;
