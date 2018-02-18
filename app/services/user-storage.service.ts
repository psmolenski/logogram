class UserStorage {
    getItem(key: string): any {
        const itemJson = window.localStorage.getItem(key);

        if (itemJson === null) {
            return null;
        }

        return JSON.parse(itemJson);
    }

    setItem(key: string, value: any): any {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

export default UserStorage;