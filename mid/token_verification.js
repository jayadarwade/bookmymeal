const jwt = require("jsonwebtoken");
exports.verifyToken = (request, response, next) => {
  try {
    console.log("Token:" + request.headers.authorization);
    if (!request.headers.authorization)
      return response.status(401).send("unauthorised request");
    if (request.headers.authorization == null)
      return response.status(401).send("unauthorised request");

    let token = request.headers.authorization.split(" ")[1];
    let payload = jwt.verify(token, "abcdefghij");
    console.log(payload);
    next();
  } catch (err) {
    return response.status(401).send("unauthorised request");
  }
};
