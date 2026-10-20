import {InputPostType} from "../posts/dto/posts.input.dto";
import {InputBlogType} from "../blogs/dto/blogs.input.dto";

export type FieldNamesType = keyof InputPostType | keyof InputBlogType

export type OutputErrorsType = {
    errorsMessages: {message: string, field: FieldNamesType}[]
}