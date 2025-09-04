export function normalizeUser(value) {
  return {
    name: {
      first: value.first,
      last: value.last,
    },
    email: value.email,
    password: value.password,
    image: {
      url: value.url,
      alt: value.alt,
    },
  };
}
