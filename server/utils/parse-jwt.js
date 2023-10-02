function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
}

export default parseJwt