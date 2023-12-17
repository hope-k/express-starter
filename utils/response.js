const successRes = (message, data) => {
    return {
        message,
        success: true,
        result: data
    }
}

const errorRes = (error) => {
    return {
        success: false,
        message: error
    }
}

export {
    successRes,
    errorRes
}