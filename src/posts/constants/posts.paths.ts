export const POSTS_PATH = '/posts'

export const POSTS_ROUTES = {
    ROOT: '',
    BY_ID: '/:id',
    POSTS_FOR_COMMENT:'/:postId/comments'
} as const