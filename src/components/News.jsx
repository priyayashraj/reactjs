import React, { useState, useEffect } from "react";
import { getLatetsNews } from "../api/newsApi";
import { useQuery } from "react-query";
import { Select, Typography, Row, Col, Avatar, Card, Option } from "antd";
import { getGlobalStats } from "../api/api.js";
import moment from "moment";
import Loader from "./Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [cryptoNews, setCryptoNews] = useState();
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const count = simplified ? 6 : 12;
  const getAllLatestNews = async () => await getLatetsNews(newsCategory, count);
  const {
    data: newsData,
    isLoading,
    error,
  } = useQuery(["news", newsCategory], getAllLatestNews);

  const getAllGlobalStats = async () => await getGlobalStats(100);
  const { data } = useQuery("coins", getAllGlobalStats);

  useEffect(() => {
    if (newsData) {
      setCryptoNews(newsData?.value);
    }
  }, [newsData]);

  if (isLoading) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option value="Cryptocurency">Cryptocurrency</Select.Option>
            {data?.data?.coins?.map((currency) => (
              <Select.Option value={currency.name}>
                {currency.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Typography.Title className="news-title" level={4}>
                  {news.name}
                </Typography.Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt=""
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=""
                  />
                  <Typography.Text className="provider-name">
                    {news.provider[0]?.name}
                  </Typography.Text>
                </div>
                <Typography.Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Typography.Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
