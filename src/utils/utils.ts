export const SaveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export const GetFromLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}
