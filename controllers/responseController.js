const errorResponse = (
    res, {
        statusCode = 500,
        message = 'Internal Server Error'
    }
) => {
    res.status(statusCode).json({
        status: statusCode,
        body: { message }
    });
}

const successResponse = (
    res, {
        statusCode = 200,
        body = {}
    }
) => {
    res.status(statusCode).json({
        status: statusCode,
        body
    });
}


module.exports = {
    errorResponse,
    successResponse
}