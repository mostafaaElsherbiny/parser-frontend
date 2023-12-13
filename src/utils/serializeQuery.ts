export const serializeQuery = (query: string | object, location: URLSearchParams, value?: any) => {
    let qs: any = {

    }
    qs['page'] = 1
    qs['count'] = 10
    location.forEach((value, key) => {
        qs[key] = value
    });

    typeof query === 'string' ? qs[query] = value : qs = Object.assign({}, qs, query)

    const newSearchParams = Object.keys(qs)
        .filter((key) => qs[key])
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(qs[k] as string)}`)
        .join('&')

    return `${new URLSearchParams(newSearchParams)}`
}
