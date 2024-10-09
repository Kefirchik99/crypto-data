# Crypto Exchange project

A cryptocurrency application built with React that provides users with real-time metrics, historical data, and conversion tools for various cryptocurrencies.

## API Reference

#BASE URL
https://api.coinpaprika.com/v1

### Endpoints

#### Get Coin List:

```http
 GET /tickers
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `quotes`  | `string` | Currency symbol (e.g., USD) |

#### Get Global Data:

```http
 GET /global
```

#### Get Coin by ID:

```http
 GET /tickers/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. Id of the coin to fetch |
| `quotes`  | `string` | Currency symbol (e.g., USD)           |

#### Get Historical Data:

```http
 GET /tickers/${id}/historical
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `id`       | `string` | **Required**. Coin ID         |
| `quotes`   | `string` | **Required**. Currency symbol |
| `start`    | `string` | Start date (ISO format)       |
| `interval` | `string` | Interval (e.g., 1h, 1d)       |

#### Price Converter:

```http
 GET /price-converter
```

| Parameter      | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `baseCurrency` | `string` | **Required**. Coin ID           |
| `quotes`       | `string` | **Required**. Quote currency ID |
| `amount`       | `number` | **Required**. Amount to convert |

#### Search:

```http
 GET /search
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `q`       | `string` | **Required**. Query to search |

## Acknowledgements

Special thanks to the creators of React, Bootstrap, and other open-source tools that made this project possible.

## Features

- Coin Metrics and Charts: View detailed metrics and historical data through dynamic charts.
- Price Comparison: Compare the prices of different cryptocurrencies and track price changes.
- Currency Converter: Convert between different cryptocurrencies easily.
- Global Data: Stay updated with global cryptocurrency statistics.
- Exchange Listings: View a list of exchanges and their listed coins.
- History Log: Track your past conversions and interactions.

## Tech Stack

**Client:** React, React-Bootstrap, SCSS

**Tools:** Vite, CoinPaprika API

## Run Locally

Clone the project

```bash
  git clone https://github.com/Kefirchik99/crypto-data/
```

Go to the project directory

```bash
  cd crypto-data
```

Install dependencies

```bash
  npm install
```

Run the project

```bash
  npm run dev
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```
