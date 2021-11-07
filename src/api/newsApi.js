//https://bing-news-search1.p.rapidapi.com
import axios from "axios";
export const getLatetsNews = async (newsCategory, count) => {
  try {
    const { data } = await axios.get(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
      {
        headers: {
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
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
