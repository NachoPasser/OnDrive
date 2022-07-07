function validator_string(val, model, field) {
  if (typeof val !== "string")
    throw new Error(`${model} ${field} must be a string`);
}

function validator_emptyString(val, model, field) {
  let copyValue = val.replace(/ /g, ""); //remove all spaces
  if (copyValue === "" || copyValue.length === 0)
    throw new Error(`${model} ${field} cannot be an empty string`);
}

function validator_validLength(val, model, field, max) {
  if (val.length > max)
    throw new Error(`${model} ${field} must not exceed ${max} characters`);
}

function validator_validRange(
  val,
  model,
  field,
  min = 1950,
  max = new Date().getFullYear()
) {
  if (val < min || val > max)
    throw new Error(`${model} ${field} must be between ${min} and ${max}`);
}

module.exports = {
  validator_string,
  validator_emptyString,
  validator_validLength,
  validator_validRange,
};
