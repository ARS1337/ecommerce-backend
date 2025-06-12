module.exports = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (error) {
    const errorResponse = {
      errors: [],
      type: 'VALIDATION_ERROR',
    };
    errorResponse.errors = error.issues.map((item) => ({
      code: item.code,
      message: item.message,
      path: item.path,
    }));
    return res.status(400).json(errorResponse);
  }
};
