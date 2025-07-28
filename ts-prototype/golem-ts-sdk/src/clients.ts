export function getLocalClient<T extends new (...args: any[]) => any>(ctor: T) {
    return (...args: any[]) => {
        const instance = new ctor(...args);
        return new Proxy(instance, {
            get(target, prop) {
                const val = target[prop];
                if (typeof val === "function") {
                    return (...fnArgs: any[]) => {
                        console.log(`[Local] ${ctor.name}.${String(prop)}(${fnArgs})`);
                        return val.apply(target, fnArgs);
                    };
                }
                return val;
            }
        });

    }
}

export function getRemoteClient<T extends new (...args: any[]) => any>(ctor: T) {
    return (...args: any[]) => {
        const instance = new ctor(...args);
        return new Proxy(instance, {
            get(target, prop) {
                const val = target[prop];
                if (typeof val === "function") {
                    return (...fnArgs: any[]) => {
                        console.log(`[Remote] ${ctor.name}.${String(prop)}(${fnArgs})`);
                        return Promise.resolve(`<<remote ${String(prop)} result>>`);
                    };
                }
                return val;
            }
        });
    };
}
