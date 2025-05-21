import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsItems from './NewsItems'; // Make sure this component exists

const Search = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get('q'); // Get the search query from URL

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=73a1cba2fe7e46a984f7b0ecb0d397e5`;
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
      setLoading(false);
    };

    if (query) {
      fetchArticles();
    }
  }, [query]); // Fetch news when the search query changes

  return (
    <div className="container my-3">
      <h2>{query.toUpperCase()}-Headlines</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4" key={article.url}>
              <NewsItems
                title={article.title}
                description={article.description}
                imgUrl={article.urlToImage || 'error.jpg'}
                url={article.url}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
