// src/utils/sanitize.js
export const mongoSanitize = (data) => {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;
  if (data instanceof Date || data instanceof Buffer) return data;

  if (Array.isArray(data)) {
    return data.map((item) => mongoSanitize(item));
  }

  const sanitized = {};
  for (const key of Object.keys(data)) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }

    sanitized[key] = mongoSanitize(data[key]);
  }
  return sanitized;
};

export const sanitizeMiddleware = (req, res, next) => {
  try {
    req.body = mongoSanitize(req.body ?? {});
    req.params = mongoSanitize(req.params ?? {});

    // Instead of replacing req.query (which is readonly), sanitize its keys in-place
    const sanitizedQuery = mongoSanitize(req.query ?? {});
    for (const key in sanitizedQuery) {
      req.query[key] = sanitizedQuery[key];
    }

    next();
  } catch (err) {
    console.error('Sanitization Error:', {
      error: err.message,
      body: req.body,
      query: req.query,
      params: req.params,
    });
    res.status(400).json({
      error: 'Invalid request data structure',
      details: err.message,
    });
  }
};
