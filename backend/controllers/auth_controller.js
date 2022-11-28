const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require('../models/models');
const { Op } = require('sequelize');

// Mail host example
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'reed.mclaughlin43@ethereal.email',
        pass: 'ZET74cNcFJCZ49YfYv'
    }
});

const send_mail = (path, email, jwt) => {
    transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: email,
        subject: 'Message from Node js',
        text: "",
        html: `
        <div>
            <h1>Activation link:</h1>
            <a href="http://127.0.0.1:${process.env.CL_PORT}/${path}/${jwt}" target="_blank">click to confirm</a>
        </div>
        `,
    });
}

const generateJwt = (id, login, time) => {
    return jwt.sign({ id, login },
        process.env.SECRET_KEY,
        { expiresIn: time }
    );
}

class AuthController {
    async register(req, res, next) {
        try {
            const { login, password, password_conf, email } = req.body;
            console.log(req.body)
            if (!login || !password || !password_conf || !email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            if (password !== password_conf) {
                return next(ApiError.badRequest("Подтвердите пароль!"));
            }
            if (await User.findOne({ where: { [Op.or]: [{ login }, { email }] } })) {
                return next(ApiError.badRequest("Пользователь уже существует!"));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            let user = await User.create({ login, password: hashPassword, email });
            // send_mail('register', user.email, generateJwt(user.id, '', ''));
            return res.json({ message: "Регистрация успешна!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async login(req, res, next) {
        try {
            const cookies = req.cookies;
            const { login, password, email } = req.body;
            if (!login || !password || !email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            const user = await User.findOne({ where: { login, email } });
            if (!user) {
                return next(ApiError.notFound("Пользователь не найден!"));
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return next(ApiError.badRequest("Неверные данные!"));
            }
            const accessToken = generateJwt(user.id, user.login, '24h');
            const newRefreshToken = generateJwt(user.id, user.login, '60s');
            if (cookies?.token) {
                res.clearCookie('token', {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'None'
                });
            }
            res.cookie('token', accessToken, {
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'None'
            });
            res.json(newRefreshToken);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async logout(req, res) {
        try {
            const cookies = req.cookies;
            if (cookies?.token) {
                res.clearCookie('token', {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'None'
                });
            }
            return res.json({ message: "Logout complete!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async password_reset(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.notFound());
            }
            send_mail('password-reset', user.email, generateJwt(user.id, '', ''));
            return res.json({ message: "Check email!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async password_confirm(req, res) {
        try {
            const { new_password, password_conf } = req.body;
            if (!new_password || !password_conf) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            if (new_password !== password_conf) {
                return next(ApiError.badRequest("Подтвердите пароль!"));
            }
            const { token } = req.params;
            const { id } = jwt.verify(token, process.env.SECRET_KEY);
            const hashPassword = await bcrypt.hash(new_password, 5);
            const user = await User.update({ password: hashPassword }, { where: { id } });
            if (!user) return next(ApiError.notFound("User does not exists"));
            return res.json({ message: "Password changed!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async check(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) return next(ApiError.notAuth());
            const { id, login } = jwt.verify(token, process.env.SECRET_KEY);
            res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
            let user = await User.findOne({ where: { id } });
            const jwt_token = generateJwt(
                id,
                login,
            );
            res.cookie("token", token, {
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'None'
            }); //24h
            return res.json(jwt_token);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }
}

module.exports = new AuthController();