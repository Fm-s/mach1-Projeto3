const isValidUrl = (url) => {
    const regex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(?::\d+)?(?:\/[^\s]*)?$/;
    return regex.test(url);
}

export default isValidUrl;