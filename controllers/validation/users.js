const { body } = require("express-validator");
const { attachErrors, raiseErrors } = require("./common");
const db = require("../../db/queries");

module.exports.validateSignUp = [
  commonlyValidate("username").custom(async (username) => {
    if (await db.hasUsername(username)) {
      throw new Error("username already exists");
    }
  }),
  commonlyValidate("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  commonlyValidate("passwordConfirm")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("passwords must match"),
  commonlyValidate("firstName"),
  commonlyValidate("lastName"),
  attachErrors,
];

module.exports.validateLogin = [
  commonlyValidate("username"),
  commonlyValidate("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  attachErrors,
];

function commonlyValidate(field) {
  return body(field)
    .trim()
    .exists({ values: "falsy" })
    .withMessage(`${field} is required`)
    .isLength({ max: 64 })
    .withMessage(`${field} must contain at most 64 characters`);
}
