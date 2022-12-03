const ApiError = require('../error/ApiError');
const { Calendar } = require('../models/models');

class CalendarController {
    async get_calendars(req, res, next) {
        try {
            const calendars = await Calendar.findAll({ where: { userId: req.user.id } });
            return res.json(calendars);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async create_calendar(req, res, next) {
        try {
            const { title } = req.body;
            if (!title) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            await Calendar.create({ title, userId: req.user.id });
            return res.json({ message: "Create success!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Create calendar error!"));
        }
    }

    async update_calendar(req, res, next) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const calendar = await Calendar.findOne({ where: { id } });
            if (!calendar) {
                return next(ApiError.notFound("Calendar not found!"));
            }
            if (req.user.id != calendar.userId) {
                return next(ApiError.forbidden());
            }
            if (!title) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            await Calendar.update(title, { where: { id } });
            return res.json({ message: "Calendar updated!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Update calendar error!"));
        }
    }

    async delete_calendar(req, res, next) {
        try {
            const { id } = req.params;
            const calendar = await Calendar.findOne({ where: { id } });
            if (req.user.id != calendar.userId) {
                return next(ApiError.forbidden());
            }
            await Posts.destroy({ where: { id } });
            return res.json({ message: "Calendar deleted!" });
        } catch (error) {
            console.log(error)
            return next(ApiError.internal("Delete calendar error!"));
        }
    }
}

module.exports = new CalendarController();