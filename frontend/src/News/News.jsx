import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';
import { Loading } from './Loading';
import PropTypes from 'prop-types';

const News = ({ country = 'us', pageSize = 12, category = 'general', setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setProgress(10);
    const url = `http://localhost:5000/api/news?page=${page}&category=${category}&pageSize=${pageSize}`;
    setLoading(true);
    setProgress(30);

    try {
      let data = await fetch(url);
      setProgress(50);
      let parsedData = await data.json();
      setProgress(70);

      console.log("Fetched Page:", page);
      console.log("Total Results from API:", parsedData.totalResults);
      console.log("Articles returned:", parsedData.articles.length);

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page, category]); 

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    const maxPages = Math.ceil(Math.min(totalResults, 100) / pageSize);
    if (page < maxPages) {
      setPage(page + 1);
    }
  };

  const maxPages = Math.ceil(Math.min(totalResults, 100) / pageSize);

  return (
    <div>
      <div className="container my-3">
        <h2 className="text-center">{category.toUpperCase()} NEWS</h2>
        {loading && <Loading />}
        <div className="container">
          <div className="row">
            {!loading &&
              articles.map((element) => {
                if (element.author !== 'null') {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItems
                        title={element.title ? element.title.slice(0, 50) : ' '}
                        description={element.description ? element.description.slice(0, 45) : ' '}
                        imgUrl={element.urlToImage ? element.urlToImage : 'error.jpg'}
                        url={element.url}
                      />
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>

        <div className="container d-flex justify-content-between my-3">
          <button
            type="button"
            disabled={page <= 1 || loading}
            onClick={handlePrevClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <p className="text-muted align-self-center">Page {page} of {maxPages}</p>
          <button
            type="button"
            disabled={page >= maxPages || loading}
            onClick={handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
