export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT =
  process.env.PORT || process.env.NODE_ENV === 'test' ? 4000 : 5000;
export const GRAPHQL_ENDPOINT = `http://localhost:${PORT}/graphql`;
export const EXPRESS_ENDPOINT = `http://localhost:${PORT}`;
