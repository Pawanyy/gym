import BaseController from './baseController.js';
import { createContactSchema } from '../validation/contactValidation.js';
import Contact from '../models/Contact.js';
import emailQueue from '../services/EmailQueue.js';
import { paginateAndSearch } from './../utils/appUtils.js';
import mongoose from 'mongoose';


export default class ContactController extends BaseController {
    constructor() {
        super();
    }

    getContact = async (req, res) => {
        try {
            const contactId = req.params.contactId;
            const isObjectId = mongoose.isValidObjectId(contactId);

            if (!isObjectId) {
                return res.json(this.respondError("Invalid Contact Record!", 404));
            }

            const contact = await Contact.findOne({ _id: contactId, isDeleted: false }, { password: 0 });

            if (!contact) {
                return res.json(this.respondError("Contact not Found!", 404));
            }

            return res.json(this.respondSuccess(contact, "Data fetched successfully"));
        } catch (err) {
            throw err;
        }
    }

    getContacts = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = req.query.search ? { email: new RegExp(req.query.search, 'i'), isDeleted: false } : { isDeleted: false };

            const { documents, total, page: currentPage, totalPages } = await paginateAndSearch(
                mongoose.model('Contact'),
                searchQuery,
                page,
                limit
            );

            return res.json(this.respondSuccess({
                records: documents,
                total,
                page: currentPage,
                totalPages,
            }, "Data fetched successfully"));

        } catch (err) {
            throw err;
        }
    }

    createContact = async (req, res) => {
        try {
            const { error, value: payload } = createContactSchema.validate(req.body);
            if (error) return res.json(this.handleValidationError(error));

            const newContact = await Contact.create({ ...payload });

            if (process.env.CONTACT_EMAIL_ENABLED || false) {
                await emailQueue.add({
                    service: "contact:create",
                    to: process.env.CONTACT_EMAIL,
                    subject: `Inquiery: ${payload.subject}`,
                    text: `Inquiery From: ${payload.email}\n${payload.message}`,
                    html: `<div><h2>Inquiery From: ${payload.email}</h2><br/><p>${payload.message}</p></div>`,
                });
            }

            return res.json(this.respondSuccess(null, "Thank you! Your message has been sent."));
        } catch (err) {
            throw err;
        }
    }
}
