function debounce(callback: Function, delay = 500) {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: any) => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

export { debounce };
