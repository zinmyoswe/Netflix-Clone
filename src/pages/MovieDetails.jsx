import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getMovieTrailer } from '../services/api';
import './MovieDetails.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [teaserUrl, setTeaserUrl] = useState('');
  const [actors, setActors] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [duration, setDuration] = useState('');
  const [director, setDirector] = useState('');
  const [writers, setWriters] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log(`Fetching details for movie ID: ${movieId}`);

        // Fetch movie details
        const movieData = await getMovieDetails(movieId);
        if (!movieData || movieData.status_code) {
          throw new Error('Movie not found');
        }
        setMovie(movieData);
        setDuration(formatDuration(movieData.runtime));

        // Fetch trailer
        const trailerData = await getMovieTrailer(movieId);
        const trailer = trailerData.results.find((video) => video.type === 'Trailer');
        const teaser = trailerData.results.find((video) => video.type === 'Teaser');

        if (trailer) {
          setTrailerUrl(trailer.key);
        }
        if (teaser) {
          setTeaserUrl(teaser.key);
        }

        // Fetch credits (actors and crew)
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const creditsData = await creditsResponse.json();
        setActors(creditsData.cast);

        // Get the crew for directors and writers
        const crewResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const crewData = await crewResponse.json();
        const director = crewData.crew.find(person => person.job === 'Director');
        const writers = crewData.crew.filter(person => person.job === 'Writer');

        if (director) {
          setDirector(director.name);
        }
        setWriters(writers.map(writer => writer.name));

        // Get categories
        const categoryNames = movieData.genres.map(genre => ({ id: genre.id, name: genre.name }));
        setCategories(categoryNames);

        // Fetch recommendations
        const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData.results || []);

      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Function to format duration in hours and minutes
  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs} hr ${mins} min`;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-content">
        <div className="movie-details-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-details-info">
          <h1>{movie.title}</h1>
          <p className="movie-details-tagline">{movie.tagline}</p>
          <p className="movie-details-overview">{movie.overview}</p>
          <p className="movie-details-release-date">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="movie-details-rating">
            <strong>Rating:</strong> {movie.vote_average} / 10
          </p>
          <p className="movie-details-duration">
            <strong>Duration:</strong> {duration}
          </p>
          <p className="movie-details-director">
            <strong>Director:</strong> {director}
          </p>
          <p className="movie-details-writers">
            <strong>Writers:</strong> {writers.join(', ')}
          </p>
          <p className="movie-details-categories">
            <strong>Categories:</strong> 
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`} 
                className="category-link"
              >
                {category.name}{index < categories.length - 1 ? ', ' : ''}
              </Link>
            ))}
          </p>

          {teaserUrl && (
            <div className="movie-details-teaser">
              <h2>Teaser</h2>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${teaserUrl}`}
                title="Teaser"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {trailerUrl && (
            <div className="movie-details-trailer">
              <h2>Trailer</h2>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerUrl}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="movie-details-actors">
            <h2>Actors</h2>
            <ul>
              {actors.slice(0, 5).map((actor) => (
                <li key={actor.id}>
                  <Link to={`/actor/${actor.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                    />
                    <p>{actor.name} as {actor.character}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-details-recommendations">
            <h2>Recommendations</h2>
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map((recommendation) => (
                  <li key={recommendation.id}>
                    <Link to={`/movie/${recommendation.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w300${recommendation.poster_path}`}
                        alt={recommendation.title}
                      />
                      <strong>{recommendation.title}</strong>
                      {/* <p>{recommendation.overview}</p> */}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recommendations available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
