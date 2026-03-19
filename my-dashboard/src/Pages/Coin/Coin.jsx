import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../../Components/LineChart/LineChart";
import { CoinContext } from "../../Context/CoinContext";
import "./Coin.css";

const Coin = () => {
  const { coinid } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicaldata, setHistoricaldata] = useState();
  const { currency } = useContext(CoinContext);

  const fetchcoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        // No API key header needed for demo
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchhistoricaldata = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setHistoricaldata(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchcoinData();
    fetchhistoricaldata();
  }, [currency]);

  if (coinData && historicaldata) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt={coinData.name} />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicaldata={historicaldata} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
