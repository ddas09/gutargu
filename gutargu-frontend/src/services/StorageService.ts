class StorageService {
    static getValue<T>(key: string): T | null {
        const value = sessionStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : null;
    }

    static setValue<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    static removeValue(key: string): void {
        sessionStorage.removeItem(key);
    }

    static clearStorage(): void {
        sessionStorage.clear();
    }
}

export default StorageService;
  