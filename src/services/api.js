

const apiUrl = 'https://api.coinpaprika.com/v1'

export const getCoinList = async (currency) => {
    const params = new URLSearchParams({
        quotes: currency,
    });

    const response = await fetch(`${apiUrl}/tickers?${params}`);
    return await response.json();
};

export const getGlobalData = async () => {
    const response = await fetch(`${apiUrl}/global`);
    return await response.json();
};

export const getCoinById = async (id, currency) => {
    const params = new URLSearchParams({
        quotes: currency,
    });

    const response = await fetch(`${apiUrl}/tickers/${id}?${params}`);

    return await response.json();
};

export const getHistoricalData = async ({ id, currency, start, interval }) => {
    const params = new URLSearchParams({
        quotes: currency,
        start,
        interval,

    });

    const response = await fetch(`${apiUrl}/tickers/${id}/historical?${params}`);

    const data = await response.json();

    if (response.status !== 200 && 'error' in data) {
        throw new Error(data.error);
    }

    return data;
};

export const getSearch = async (q) => {
    const params = new URLSearchParams({
        q,
    });
    const response = await fetch(`${apiUrl}/search/?${params}`);
    return await response.json();
};


export const getPriceConverter = async (params) => {
    const queryParams = new URLSearchParams({
        base_currency_id: baseCurrency,
        qiote_currency_id: quoteCurrency,
        amount,
    });

    const response = await fetch(`${apiUrl}/price-converter?${queryParams}`);

    const data = await response.json();

    if (response.status !== 200 && 'error' in data) {
        throw new Error(data.error);
    }

    return data;
};

export const getExchangeList = async () => {
    const response = await fetch(`${apiUrl}/exchanges`);
    const data = await response.json();

    if (response.status !== 200 && 'error' in data) {
        throw new Error(data.error);
    }

    return data;
}