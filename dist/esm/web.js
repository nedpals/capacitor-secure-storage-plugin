import { WebPlugin } from '@capacitor/core';
export class SecureStoragePluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'SecureStoragePlugin',
            platforms: ['web'],
        });
        this.PREFIX = 'cap_sec_';
        this.addPrefix = (key) => this.PREFIX + key;
        this.removePrefix = (key) => key.replace(this.PREFIX, '');
    }
    get(options) {
        return localStorage.getItem(this.addPrefix(options.key)) !== null
            ? Promise.resolve({
                value: atob(localStorage.getItem(this.addPrefix(options.key))),
            })
            : Promise.reject('Item with given key does not exist');
    }
    set(options) {
        localStorage.setItem(this.addPrefix(options.key), btoa(options.value));
        return Promise.resolve({ value: true });
    }
    remove(options) {
        localStorage.removeItem(this.addPrefix(options.key));
        return Promise.resolve({ value: true });
    }
    clear() {
        for (const key in localStorage) {
            if (key.indexOf(this.PREFIX) === 0) {
                localStorage.removeItem(key);
            }
        }
        return Promise.resolve({ value: true });
    }
    keys() {
        const keys = Object.keys(localStorage).filter((k) => k.indexOf(this.PREFIX) === 0).map(this.removePrefix);
        return Promise.resolve({ value: keys });
    }
    getPlatform() {
        return Promise.resolve({ value: 'web' });
    }
}
const SecureStoragePlugin = new SecureStoragePluginWeb();
export { SecureStoragePlugin };
//# sourceMappingURL=web.js.map