import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getPopularMovies,
  getTrendingMovies,
  getBlockbusterMovies,
  getOnlyOnNetflix,
  getUpcomingMovies,
  getTopPickForYou,
  getKdramas,
  getActionMovies,
  getSoutheastAsianMovies,
  getChineseTvShows,
  getKoreanTvShows,
  getComedyMovies,
  getUsTvDramas,
  getThailandPopularMovies,
  getIndiaMovies,
  searchMovies
} from '../services/api';
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [blockbusterMovies, setBlockbusterMovies] = useState([]);
  const [onlyOnNetflix, setOnlyOnNetflix] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topPickForYou, setTopPickForYou] = useState([]);
  const [kDramas, setKDramas] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [southeastAsianMovies, setSoutheastAsianMovies] = useState([]);
  const [chineseTvShows, setChineseTvShows] = useState([]);
  const [koreanTvShows, setKoreanTvShows] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [usTvDramas, setUsTvDramas] = useState([]);
  const [thailandPopularMovies, setThailandPopularMovies] = useState([]);
  const [indiaMovies, setIndiaMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const popularMoviesData = await getPopularMovies();
      setPopularMovies(popularMoviesData);

      const trendingMoviesData = await getTrendingMovies();
      setTrendingMovies(trendingMoviesData);

      const blockbusterMoviesData = await getBlockbusterMovies();
      setBlockbusterMovies(blockbusterMoviesData);

      const onlyOnNetflixData = await getOnlyOnNetflix();
      setOnlyOnNetflix(onlyOnNetflixData);

      const upcomingMoviesData = await getUpcomingMovies();
      setUpcomingMovies(upcomingMoviesData);

      const topPickForYouData = await getTopPickForYou();
      setTopPickForYou(topPickForYouData);

      const kdramasData = await getKdramas();
      setKDramas(kdramasData);

      const actionMoviesData = await getActionMovies();
      setActionMovies(actionMoviesData);

      const southeastAsianMoviesData = await getSoutheastAsianMovies();
      setSoutheastAsianMovies(southeastAsianMoviesData);

      const chineseTvShowsData = await getChineseTvShows();
      setChineseTvShows(chineseTvShowsData);

      const koreanTvShowsData = await getKoreanTvShows();
      setKoreanTvShows(koreanTvShowsData);

      const comedyMoviesData = await getComedyMovies();
      setComedyMovies(comedyMoviesData);

      const usTvDramasData = await getUsTvDramas();
      setUsTvDramas(usTvDramasData);

      const thailandPopularMoviesData = await getThailandPopularMovies();
      setThailandPopularMovies(thailandPopularMoviesData);

      const indiaMoviesData = await getIndiaMovies();
      setIndiaMovies(indiaMoviesData);
    };

    fetchMovies();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const searchResultsData = await searchMovies(searchQuery);
      setSearchResults(searchResultsData);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="home">
      <div className="header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Netflix_Logo.png" alt="Netflix Logo" />
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}  // Add onKeyDown handler
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {isSearching ? (
        <div className="movie-section">
          <h2>Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="movie-grid">
              {searchResults.map((movie) => (
                <Link to={`/tv/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <p>No results found</p>
          )}
        </div>
      ) : (
        <>
          <div className="movie-section">
            <h2>Popular on Netflix</h2>
            <div className="movie-grid">
              {popularMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Trending</h2>
            <div className="movie-grid">
              {trendingMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Blockbuster Movies</h2>
            <div className="movie-grid">
              {blockbusterMovies.map((movie) => (
                <Link to={`/tv/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Only on Netflix</h2>
            <div className="movie-grid">
              {onlyOnNetflix.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Upcoming</h2>
            <div className="movie-grid">
              {upcomingMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Top Pick for You</h2>
            <div className="movie-grid">
              {topPickForYou.map((movie) => (
                <Link to={`/tv/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>K-Dramas</h2>
            <div className="movie-grid">
              {kDramas.map((movie) => (
                <Link to={`/tv/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Action Movies</h2>
            <div className="movie-grid">
              {actionMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Southeast Asian Movies</h2>
            <div className="movie-grid">
              {southeastAsianMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Chinese TV Shows</h2>
            <div className="movie-grid">
              {chineseTvShows.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Korean TV Shows</h2>
            <div className="movie-grid">
              {koreanTvShows.map((movie) => (
                <Link to={`/tv/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Comedy Movies</h2>
            <div className="movie-grid">
              {comedyMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>US TV Dramas</h2>
            <div className="movie-grid">
              {usTvDramas.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Popular Thailand Movies</h2>
            <div className="movie-grid">
              {thailandPopularMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="movie-section">
            <h2>Popular Indian Movies</h2>
            <div className="movie-grid">
              {indiaMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
