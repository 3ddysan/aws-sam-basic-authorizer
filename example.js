exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: 201,
        body: "content"
    });
};