import { useState, useEffect } from 'react'

export default function useLocalStorage<T>(key: string, intialState: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) {
            return JSON.parse(jsonValue)
        }
        if (typeof intialState === 'function') {
            return (intialState as () => T)();
        }
        return intialState
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue] as [typeof value, typeof setValue]
}
