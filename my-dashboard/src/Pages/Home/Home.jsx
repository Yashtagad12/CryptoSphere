import { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../Context/CoinContext';   // ← adjust path if needed
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {

  const { allCoins, currency, loading, error } = useContext(CoinContext);
  const [displaycoin, setDisplaycoin] = useState([]);
  const [input, setInput] = useState('');

  const handleinput = (event) => {
  const inputvalue = event.target.value;
  setInput(inputvalue);

  if(inputvalue === "") {
    setDisplaycoin(allCoins)
  }
  }

  const formhandler = async (event) => {
    event.preventDefault();
    const coins = await allCoins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplaycoin(coins);
  }

  useEffect(() => {
    setDisplaycoin(allCoins || []);
  }, [allCoins]);

  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest <br />Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about crypto.</p>
        <form onSubmit={formhandler}>
          <input type="text" list='coinlist' placeholder='Search Crypto..' value={input} onChange={handleinput} required />

          <datalist id='coinlist'>
            {
              allCoins.map((item, index) => (<option key={index} value={item.name}/>))
            }
          </datalist>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className='crypto-table'>
        <div className='table-layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:'center'}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>

        {loading ? (
          <p>Loading top cryptocurrencies...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : displaycoin.length === 0 ? (
          <p>No coins available</p>
        ) : (
          displaycoin.slice(0,10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={item.id || index}>
              <p>{item.market_cap_rank ?? '-'}</p>
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/28?text=?'; }}
                />
                <p>{item.name + "-" + item.symbol?.toUpperCase()}</p>
              </div>
              <p>
                {currency.symbol}
                {item.current_price?.toLocaleString() ?? '—'}
              </p>
              <p className={item.price_change_percentage_24h>0? "green" : "red"}>
                {item.price_change_percentage_24h != null
                  ? item.price_change_percentage_24h.toFixed(2) + '%'
                  : '—'}
              </p>
              <p className='market-cap'>
                {currency.symbol}
                {item.market_cap?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? '—'}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Home;