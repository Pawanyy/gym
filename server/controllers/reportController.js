import BaseController from './baseController.js';
import Order from '../models/Order.js';
import User from './../models/User.js';
import Contact from './../models/Contact.js';
import WorkoutPlan from '../models/WorkoutPlan.js';


export default class ReportController extends BaseController {
    constructor() {
        super();
    }

    getDashReport = async (req, res) => {
        try {

            const totalUser = await User.find({ isDeleted: false }).countDocuments();
            const totalOrder = await Order.find({ isDeleted: false }).countDocuments();
            const totalContact = await Contact.find({ isDeleted: false }).countDocuments();
            const totalWorkoutPlan = await WorkoutPlan.find({ isDeleted: false }).countDocuments();

            console.log(totalContact)


            return res.json(this.respondSuccess({
                totalUser: totalUser,
                totalOrder: totalOrder,
                totalContact: totalContact,
                totalWorkoutPlan: totalWorkoutPlan,
            }, "Data fetched successfully"));

        } catch (err) {
            throw err;
        }
    };
}
