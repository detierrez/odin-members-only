const { body } = require("express-validator");

module.exports.validateMessage = [
  commonlyValidate("title", 64),
  commonlyValidate("text", 280),
];

function commonlyValidate(field, maxLength) {
  return body(field)
    .trim()
    .exists({ values: "falsy" })
    .withMessage(`${field} is required`)
    .isLength({ max: maxLength })
    .withMessage(`${field} must contain at most ${maxLength} characters`);
}
