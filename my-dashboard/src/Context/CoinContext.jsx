// src/context/CoinContext.jsx
import { createContext, useEffect, useState, useCallback } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Common currency symbol mapping
  const currencySymbols = {
    usd: "$",
    eur: "€",
    gbp: "£",
    jpy: "¥",
    inr: "₹",
    cad: "C$",
    aud: "A$",
    chf: "CHF ",
    cny: "¥ ",
    krw: "₩",
    brl: "R$",
    rub: "₽",
    // You can add more currencies here
  };

  // Custom setter to automatically update symbol when name changes
  const handleSetCurrency = (newValue) => {
    let newName;
    if (typeof newValue === "string") {
      newName = newValue.toLowerCase();
    } else if (newValue && newValue.name) {
      newName = newValue.name.toLowerCase();
    } else {
      return; // invalid input
    }

    setCurrency({
      name: newName,
      symbol: currencySymbols[newName] || newName.toUpperCase() + " ",
    });
  };

  const fetchAllCoins = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/coingecko/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format - not an array");
      }

      setAllCoins(data);
      console.log(`Loaded ${data.length} coins`);
    } catch (err) {
      console.error("Failed to fetch coins:", err);
      setError(err.message || "Failed to load cryptocurrency data");
      setAllCoins([]);
    } finally {
      setLoading(false);
    }
  }, [currency.name]);

  useEffect(() => {
    fetchAllCoins();
  }, [fetchAllCoins]);

  const value = {
    allCoins,
    currency,
    setCurrency: handleSetCurrency,   // ← use this to change currency
    loading,
    error,
  };

  return (
    <CoinContext.Provider value={value}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;