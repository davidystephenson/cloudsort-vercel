// eslint-disable-next-line
const gaurdEntries = <const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(entries: T): { [K in T[number]as K[0]]: K[1] } => {
    return Object.entries(entries) as { [K in T[number]as K[0]]: K[1] }
}

export default gaurdEntries