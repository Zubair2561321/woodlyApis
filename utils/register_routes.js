const { authentication } = require("../middleware/authentication");
const register_routes = ({
  router = undefined,
  route = undefined,
  auth = [],
  method,
  api_function,
} = {}) => {
  if (router != undefined || route != undefined) {
    let args = [route];

    if (auth?.length > 0) {
      // if authentication is required
      args.push((req, res, next) => {
        authentication(req, res, next, auth);
      });
    }
    router[method](...args, api_function);
  }
};

module.exports = {
  register_routes,
};
