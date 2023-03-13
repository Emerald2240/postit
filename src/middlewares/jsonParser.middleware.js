//if the user passes in a bad json request, we return a response rather than let the app crash unexpectedly
const jsonParserMiddleware = async (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // console.error(err);
    return res.status(400)
      .send({ status: 404, message: err.message }); // Bad request
  } else {
    next();
  }
};

module.exports = jsonParserMiddleware;
