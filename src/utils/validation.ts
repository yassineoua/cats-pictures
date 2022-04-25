export function checkParamRequired(res, param, paramName) {
  if (!param) {
    res.status(400);
    res.json(`${paramName} is required`);
  }
}
