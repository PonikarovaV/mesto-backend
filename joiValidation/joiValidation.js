const { Joi } = require('celebrate');
const BadRequestError = require('../errors/bad-request-error');

module.exports.emailSigninSchema = Joi.string().required().email().error(new BadRequestError('Поле email и password обязательные и должны быть корректно заполнены'));

module.exports.passwordSigninSchema = Joi.string().required().regex(/^[a-zA-Z0-9*]{8,30}$/m).error(new BadRequestError('Поле email и password обязательные и должны быть корректно заполнены'));

module.exports.emailSignupSchema = Joi.string().required().email().error(new BadRequestError('Поле email обязательное и должно содержать корректный адрес'));

module.exports.passwordSignupSchema = Joi.string().required().regex(/^[a-zA-Z0-9*]{8,30}$/m).error(new BadRequestError('Поле password обязательное и может содержать символы: *, a-z, A-Z, 0-9'));

module.exports.nameSchema = Joi.string().required().regex(/^[a-zA-Zа-яёА-ЯЁ0-9\s]{2,30}$/m).error(new BadRequestError('Поле name может содержать символы: A-Z, А-Я (верхний или нижний регистр), цифры, пробел. Максимальная длина - 30.'));

module.exports.aboutSchema = Joi.string().required().regex(/^[a-zA-Zа-яёА-ЯЁ0-9\s]{2,30}$/m).error(new BadRequestError('Поле about может содержать символы: A-Z, А-Я (верхний или нижний регистр), цифры, пробел. Максимальная длина - 30.'));

module.exports.avatarSchema = Joi.string().regex(/^(?! )http(s)?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z0-9])[.-]?){1,}([a-zA-Z0-9])\.([a-zA-Z]{2,6}))(?::\d{2,5})?(?:[\\/?#]\S*)?/m).error(new BadRequestError('Поле avatar должно содержать ссылку'));

module.exports.nameUpdateSchema = Joi.string().regex(/^[a-zA-Zа-яёА-ЯЁ0-9\s]{2,30}$/m).error(new BadRequestError('Поле name может содержать символы: A-Z, А-Я (верхний или нижний регистр), цифры, пробел. Максимальная длина - 30.'));

module.exports.aboutUpdateSchema = Joi.string().regex(/^[a-zA-Zа-яёА-ЯЁ0-9\s]{2,30}$/m).error(new BadRequestError('Поле about может содержать символы: A-Z, А-Я (верхний или нижний регистр), цифры, пробел. Максимальная длина - 30.'));

module.exports.linkSchema = Joi.string().required().regex(/^(?! )http(s)?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z0-9])[.-]?){1,}([a-zA-Z0-9])\.([a-zA-Z]{2,6}))(?::\d{2,5})?(?:[\\/?#]\S*)?/m).error(new BadRequestError('Поле должно содержать ссылку'));
