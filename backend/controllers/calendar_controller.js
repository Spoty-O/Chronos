const ApiError = require('../error/ApiError');
const { User, Calendar } = require('../models/models');

class CalendarController {
    async get_calendars(req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id } });
            if (!user) {
                return next(ApiError.notFound("Пользователь не найден!"));
            }
            const calendars = await user.getCalendars();
            return res.json(calendars);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async get_create_link(req, res, next) {
        try {
            const { id } = req.params;
            const calendar = await Calendar.findOne({ where: { id } });
            if (!calendar) {
                return next(ApiError.notFound("Calendar not found!"));
            }
            return res.json({ link: `http://127.0.0.1:${process.env.CL_PORT}/share-calendar/${id}` });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Create link error!"));
        }
    }

    async create_calendar(req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id } });
            if (!user) {
                return next(ApiError.notFound("Пользователь не найден!"));
            }
            let message = '';
            if (req.query.id) {
                const id = +req.query.id;
                const calendar = await Calendar.findOne({ where: { id } });
                if (!calendar) {
                    return next(ApiError.notFound("Календарь не найден!"));
                }
                if (!await user.hasCalendar(calendar)) {
                    await user.addCalendar(calendar);
                    message = 'Add success!'
                } else {
                    message = 'Calendar was already added!'
                }
            } else {
                const { title } = req.body;
                if (!title) {
                    return next(ApiError.badRequest("Некорректное поле!"));
                }
                await user.createCalendar({ title });
                message = 'Create success!'
            }
            return res.json({ message });
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
            if (!title) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            await calendar.update({ title });
            return res.json({ message: "Calendar updated!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Update calendar error!"));
        }
    }

    async delete_calendar(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: { id: req.user.id } });
            if (!user) {
                return next(ApiError.notFound("Пользователь не найден!"));
            }
            const calendar = await Calendar.findOne({ where: { id } });
            if (!calendar) {
                return next(ApiError.notFound("Calendar not found!"));
            }
            const users = await calendar.getUsers();
            if (users.length < 2) {
                await calendar.destroy();
            } else {
                await user.removeCalendar(calendar);
            }
            return res.json({ message: "Calendar deleted!" });
        } catch (error) {
            console.log(error)
            return next(ApiError.internal("Delete calendar error!"));
        }
    }
}

module.exports = new CalendarController();