
export function load(key: string): string | null {
    return localStorage.getItem(key);
}

export function save(key: string, data: string) {
    localStorage.setItem(key, data);
}
