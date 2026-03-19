import { useState, useEffect, useContext } from 'react';
import pricingData from '../../data/pricing-data.json';
import './Pricing.css';
import ComparisonTable from '../../Components/Comparison/Comparison';
import { CoinContext } from '../../Context/CoinContext';
import Button from '../../Components/Button';

const Pricing = () => {
  const { currency } = useContext(CoinContext);

  const [plans, setPlans] = useState([]);
  const [comparisonRows, setComparisonRows] = useState([]);


  const exchangeRates = {
    usd: 1,
    eur: 0.87,
    gbp: 0.77,
    inr: 92,
    jpy: 158,

  };

  useEffect(() => {
    setPlans(pricingData.plans || []);
    setComparisonRows(pricingData.comparisonRows || []);
  }, []);

  const convertPrice = (usdPrice) => {
    if (usdPrice === 'Free') return 'Free';

    const rate = exchangeRates[currency.name] || 1;
    const converted = usdPrice * rate;

    if (currency.name === 'inr') {
      return Math.round(converted).toLocaleString('en-IN');
    } else if (currency.name === 'jpy') {
      return Math.round(converted).toLocaleString('ja-JP');
    } else {
      return converted.toFixed(2);
    }
  };

  return (
    <div className="pricing-page">
      {/* Hero */}
      <div className="hero">
        <h1>Simple & Transparent Pricing</h1>
        <p>
          No hidden fees. Prices shown in {currency.symbol} ({currency.name.toUpperCase()}).
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="plans-container">
        {plans.map((plan, index) => {
          const usdNumeric = plan.price === 'Free' ? 'Free' : parseFloat(plan.price.replace('$', ''));

          return (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}

              <h2>{plan.name}</h2>

              <div className="price">
                <span className="amount">
                  {currency.symbol}
                  {convertPrice(usdNumeric)}
                </span>
                <span className="period"> / {plan.period}</span>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <button className="plan-button">
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      <ComparisonTable comparisonRows={comparisonRows} />

      {/* Final CTA */}
      <div className="final-cta">
        <h2>Ready to Start Trading?</h2>
        <Button title="Choose Your Plan Now"/>
      </div>
    </div>
  );
};

export default Pricing;