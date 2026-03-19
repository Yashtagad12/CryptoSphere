
import { useState, useEffect } from 'react';
import './Blog.css';
import Button from '../../Components/Button';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '19e29e8196cc46a2b0c24b7aadd44ab2';
  const API_URL = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${API_KEY}&sortBy=publishedAt&pageSize=9&language=en`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }
        const data = await response.json();
        // Take only first 6 articles
        setBlogs(data.articles?.slice(0, 6) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="blog-loading">
        <h2>Loading latest crypto news...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="hero">
        <h1>Crypto Insights & News</h1>
        <p>Stay updated with the latest trends, market analysis, and expert opinions in the world of cryptocurrency.</p>
      </div>

      <div className="blogs-container">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <div className="blog-image">
              <img
                src={blog.urlToImage || 'https://via.placeholder.com/400x250?text=Crypto+News'}
                alt={blog.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x250?text=Crypto+News';
                }}
              />
            </div>
            <div className="blog-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-excerpt">{blog.description || 'No description available.'}</p>
              <div className="blog-meta">
                <span className="source">{blog.source?.name || 'Unknown Source'}</span>
                <span className="date">
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <a href={blog.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read Full Article →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="cta">
        <h2>Want More Crypto Updates?</h2>
        <p>Follow us for daily insights and market alerts.</p>
        <Button title="Subscribe to Newsletter"/>
      </div>
    </div>
  );
};

export default Blog;