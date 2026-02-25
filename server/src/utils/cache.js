import NodeCache from 'node-cache';

export const apiCache = new NodeCache({ stdTTL: 45, checkperiod: 60 });

export const cacheMiddleware = (keyBuilder) => (req, res, next) => {
  const key = keyBuilder(req);
  const cached = apiCache.get(key);
  if (cached) return res.json(cached);

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    apiCache.set(key, body);
    return originalJson(body);
  };

  return next();
};
