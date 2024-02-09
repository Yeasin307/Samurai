const errorResponse = (
    res, {
        statusCode = 500,
        message = 'Internal Server Error'
    }
) => {
    res.status(statusCode).json({
        message
    });
}

const successResponse = (
    res, {
        statusCode = 200,
        message = 'Success',
        payload = {}
    }
) => {
    res.status(statusCode).json({
        success: true,
        message,
        payload
    });
}


module.exports = {
    errorResponse,
    successResponse
}