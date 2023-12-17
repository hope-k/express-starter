import { errorRes } from "../utils/response.js"


const errorHandler = (err, req, res, next) => {
    return res.status(
        err.status || 500
    ).json(errorRes(err.message || 'Something went wrong'))
}

export { errorHandler }