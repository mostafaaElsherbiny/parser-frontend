

export function getQueryParams(key: string, location: URLSearchParams) {
  const queries = location.getAll('')

  const params = Object.fromEntries(queries.entries())

  return params[key]
}
