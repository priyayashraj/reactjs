import axios from "axios";

export const getGlobalStats = async (count, coinId) => {
  try {
    const { data } = await axios.get(
      `https://coinranking1.p.rapidapi.com/coins`,
      {
        params: {
          limit: count,
        },
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "42a990f0b5msh14d27e92a0f78d6p1aa10cjsn010165cb2bcc",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCoinDetail = async (coinId) => {
  try {
    const { data } = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "42a990f0b5msh14d27e92a0f78d6p1aa10cjsn010165cb2bcc",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCryptoHistory = async (coinId, timeperiod) => {
  try {
    const { data } = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${timeperiod}`,
      {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "42a990f0b5msh14d27e92a0f78d6p1aa10cjsn010165cb2bcc",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCryptoExchanges = async () => {
  try {
    const { data } = await axios.get(
      "https://coinranking1.p.rapidapi.com/exchanges",
      {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "42a990f0b5msh14d27e92a0f78d6p1aa10cjsn010165cb2bcc",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
