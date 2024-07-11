import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMoviesByCategory, getTVShowsByCategory } from '../services/api';
import './CategoryDetailPage.css';

const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        // Fetch movies by category
        const moviesResponse = await getMoviesByCategory(categoryId);
        setMovies(moviesResponse.results);

        // Fetch TV shows by category
        const tvShowsResponse = await getTVShowsByCategory(categoryId);
        setTvShows(tvShowsResponse.results);

        // Set category name from the first movie or TV show
        setCategoryName(moviesResponse.results[0]?.genre_ids[0] || tvShowsResponse.results[0]?.genre_ids[0]); 

      } catch (error) {
        console.error('Error fetching category details:', error);
        setError(error.message);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="category-detail-page">
      <h1>{categoryName} Content</h1>
      <div className="category-detail-content">
        <div className="movies-section">
          <h2>Movies</h2>
          <div className="movie-list">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="tvshows-section">
          <h2>TV Shows</h2>
          <div className="tvshow-list">
            {tvShows.map((tvShow) => (
              <div key={tvShow.id} className="tvshow-item">
                <Link to={`/tv/${tvShow.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`}
                    alt={tvShow.name}
                  />
                  <p>{tvShow.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
