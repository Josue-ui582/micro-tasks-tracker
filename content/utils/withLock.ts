let lock: Promise<any> = Promise.resolve();

const withLock = <T>(fn: () => Promise<T> | T): Promise<T> => {
    const next = lock.then(() => fn());
    lock = next.catch(() => {});
    return next;
};

module.exports = { withLock };