export const getHistorySearched = () => {
    return JSON.parse(localStorage.getItem("historySearched")) || [];
}

export const setHistorySearched = (historyData) => {
    JSON.stringify(historyData);
    localStorage.setItem("historySearched", JSON.stringify(historyData));
}

export const handleHistorySearch = (searchText) => {
    const historySearch = getHistorySearched();

    if (historySearch.length >= 5) {
        historySearch.shift();
    }

    historySearch.push(searchText);
    setHistorySearched(historySearch);
}