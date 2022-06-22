import Joi from 'joi'

export const USER_LOGIN_VALIDATION = Joi.object({
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
})

export const USER_REGISTER_VALIDATION = Joi.object({
    body: Joi.object({
        username: Joi.string().alphanum().min(2).max(50).required(),
        password: Joi.string().min(4).max(8).required()
    }),
    files: Joi.object({
        file: Joi.required()
    })
})

export const PUT_USER_VALIDATION = Joi.object({
    body: Joi.object({
        username: Joi.string().alphanum().min(2).max(50)
    })
})

export const DELETE_MESSAGE_VALIDATION = Joi.object({
    params: Joi.object({
        messageId: Joi.number().required()
    }),
})