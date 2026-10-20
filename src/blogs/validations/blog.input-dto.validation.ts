import {body} from 'express-validator'
import {blogsRepository} from "../repositories/blogs.repository";
import {Response, Request, NextFunction} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {adminMiddleware} from "../../global-middleware/admin.middleware";
import {inputCheckErrorsMiddleware} from "../../global-middleware/inputCheckErrorsMiddleware";

export const descriptionValidator = body('description').isString().withMessage('not string').trim().isLength({
    min: 1,
    max: 500
}).withMessage('more then 500 or 0')
export const websiteUrlValidator = body('websiteUrl').isString().withMessage('not string').trim().isURL().withMessage('not url').isLength({
    min: 1,
    max: 100
}).withMessage('more then 100 or 0')
export const nameValidator = body('name').isString().withMessage('not string').trim().isLength({
    min: 1,
    max: 15
}).withMessage('more then 15 or 0')

export const findBlogValidator = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const blog = await blogsRepository.findBlog(req.params.id)
    if (!blog) {

        res
            .status(HttpStatus.NotFound)
            .json({})
        return
    }

    next()
}

export const blogValidators = [
    adminMiddleware,

    nameValidator,
    descriptionValidator,
    websiteUrlValidator,

    inputCheckErrorsMiddleware
]