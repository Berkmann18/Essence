export let handleError = (msg, url, line) => {
    alert("[Essence] An error has occurred at l.${line} of ${url}.\n\nMessage: ${msg}");
};