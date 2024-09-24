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

export const getCoinById = async (id) => {
    const response = await fetch(`${apiUrl}/coins/${id}`)
    return await response.json();
};



