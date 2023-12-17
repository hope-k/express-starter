export const asyncErrorHandler = (asyncFn) => (req, res, next) => {
    asyncFn(req, res, next).catch(next)
}