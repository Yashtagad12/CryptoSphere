import Button from "../../Components/Button";
import "./Features.css";

const Features = () => {
  const featuresList = [
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description:
        "Your funds and data are protected with top-tier encryption, 2FA, and cold storage solutions.",
    },
    {
      icon: "⚡",
      title: "Instant Trades",
      description:
        "Lightning-fast order execution so you never miss the perfect moment in volatile markets.",
    },
    {
      icon: "📈",
      title: "Live Market Data",
      description:
        "Real-time price tracking, advanced charts, and customizable watchlists — always up to date.",
    },
    {
      icon: "💸",
      title: "Low to Zero Fees",
      description:
        "Trade more, keep more — enjoy very competitive (or even zero) fees on most pairs.",
    },
    {
      icon: "🌐",
      title: "Multi-Chain Support",
      description:
        "Trade tokens across Ethereum, Binance Smart Chain, Solana, Polygon, and more — one platform.",
    },
    {
      icon: "🛠️",
      title: "Easy Tools for Everyone",
      description:
        "From beginners to pros — simple interface + powerful features like limit orders, staking & alerts.",
    },
  ];

  return (
    <div className="features-page">
      <div className="hero">
        <h1>Powerful Features</h1>
        <p>
          Everything you need to trade, track, and grow your crypto portfolio —
          made simple and secure.
        </p>
      </div>

      <div className="features-container">
        {featuresList.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bottom-cta">
        <h2>Ready to Experience It?</h2>
        <p>
          Join CryptoSphere today and unlock the full power of crypto trading.
        </p>
        <Button title="Start Trading Now" />
      </div>
    </div>
  );
};

export default Features;
