import { Typography, Row, Col, Statistic } from "antd";
import React from "react";
import { useQueryClient, useQuery } from "react-query";
import { getGlobalStats } from "../api/api.js";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import millify from "millify";
import CryptoCurrencies from "./CryptoCurrencies.jsx";
import News from "./News.jsx";

const HomePage = () => {
  const getAllGlobalStats = async () => await getGlobalStats(10);
  const { data, isLoading, error } = useQuery(
    "globalstatistics",
    getAllGlobalStats
  );
  const globalStats = data?.data?.stats;

  if (isLoading) return <Loader />;

  return (
    <>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      {globalStats && (
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Statistic
              title="Total Cryptocurrencies"
              value={millify(globalStats.total)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap:"
              value={millify(globalStats.totalMarketCap)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24h Volume"
              value={millify(globalStats.total24hVolume)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
            />
          </Col>
        </Row>
      )}
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Typography.Title>
      </div>
      <CryptoCurrencies simplified />
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Typography.Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
