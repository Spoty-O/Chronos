const sequelize = require('../db');
const { DataTypes, NOW } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Calendar = sequelize.define('calendar', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false}
});

const Event = sequelize.define('event', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    date_start: {type: DataTypes.DATE, allowNull: false},
    date_end: {type: DataTypes.DATE, allowNull: false},
    type: {type: DataTypes.ENUM('Arrangement', 'Reminder', 'Task'), allowNull: false}
});

const UserCalendar = sequelize.define('user_calendar', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const CalendarEvent = sequelize.define('calendar_event', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

User.belongsToMany(Calendar, {through: UserCalendar});
Calendar.belongsToMany(User, {through: UserCalendar});

Calendar.belongsToMany(Event, {through: CalendarEvent});
Event.belongsToMany(Calendar, {through: CalendarEvent});

module.exports = {
    User,
    Calendar,
    Event,
    CalendarEvent
}