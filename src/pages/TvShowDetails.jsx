import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getTvShowDetails, getTVTrailer } from '../services/api';
import './MovieDetails.css';

const TvShowDetails = () => {
  const { movieId } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [teaserUrl, setTeaserUrl] = useState('');
  const [actors, setActors] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [duration, setDuration] = useState('');
  const [creator, setCreator] = useState('');
  const [writers, setWriters] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        console.log(`Fetching details for TV show ID: ${movieId}`);

        // Fetch TV show details
        const tvShowData = await getTvShowDetails(movieId);
        if (!tvShowData || tvShowData.status_code) {
          throw new Error('TV show not found');
        }
        setTvShow(tvShowData);
        setDuration(formatDuration(tvShowData.episode_run_time[0] || 0));  // Assuming episode_run_time is an array

        // Fetch trailer
        const trailerData = await getTVTrailer(movieId);
        const trailer = trailerData.results.find((video) => video.type === 'Trailer');
        const teaser = trailerData.results.find((video) => video.type === 'Teaser');

        if (trailer) {
          setTrailerUrl(trailer.key);
        }
        if (teaser) {
          setTeaserUrl(teaser.key);
        }

        // Fetch credits (actors and crew)
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const creditsData = await creditsResponse.json();
        setActors(creditsData.cast);

        // Get the creator and writers
        const creatorName = tvShowData.created_by.map(creator => creator.name).join(', ');
        setCreator(creatorName);

        const writerNames = creditsData.crew.filter(person => person.job === 'Writer').map(writer => writer.name);
        setWriters(writerNames);

        // Get categories
        const categoryNames = tvShowData.genres.map(genre => ({ id: genre.id, name: genre.name }));
        setCategories(categoryNames);
        
        // Fetch episodes
        const episodesResponse = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/season/1?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const episodesData = await episodesResponse.json();
        setEpisodes(episodesData.episodes || []);
        
        // Fetch recommendations
        const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData.results || []);
        
      } catch (error) {
        console.error('Error fetching TV show details:', error);
        setError(error.message);
      }
    };

    fetchTvShowDetails();
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

  if (!tvShow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-content">
        <div className="movie-details-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
          />
        </div>
        <div className="movie-details-info">
          <h1>{tvShow.name}</h1>
          <p className="movie-details-tagline">{tvShow.tagline}</p>
          <p className="movie-details-overview">{tvShow.overview}</p>
          <p className="movie-details-release-date">
            <strong>First Air Date:</strong> {tvShow.first_air_date}
          </p>
          <p className="movie-details-rating">
            <strong>Rating:</strong> {tvShow.vote_average} / 10
          </p>
          <p className="movie-details-duration">
            {/* <strong>Duration:</strong> {duration} */}
          </p>
          <p className="movie-details-creator">
            <strong>Creator:</strong> {creator}
          </p>
          <p className="movie-details-writers">
            <strong>Writers:</strong> {writers.join(', ')}
          </p>
          <p className="movie-details-categories">
            <strong>Categories:</strong> 
            {categories.map((category, index) => (
              <span 
                key={category.id} 
                onClick={() => navigate(`/category/${category.id}`)} 
                className="category-link"
              >
                {category.name}{index < categories.length - 1 ? ', ' : ''}
              </span>
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
          <div className="movie-details-episodes">
            <h2>Episodes</h2>
            {episodes.length > 0 ? (
              <ul>
                {episodes.map((episode) => (
                  <li key={episode.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                      alt={episode.name}
                    />
                    <strong>{episode.episode_number}. {episode.name}</strong>
                    <p>{episode.overview}</p>
                    <p><strong>Duration:</strong> {formatDuration(episode.runtime || 0)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No episodes available</p>
            )}
          </div>
          <div className="movie-details-recommendations">
            <h2>Recommendations</h2>
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map((recommendation) => (
                  <li key={recommendation.id}>
                    <Link to={`/tv/${recommendation.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w300${recommendation.poster_path}`}
                        alt={recommendation.name}
                      />
                      <strong>{recommendation.name}</strong>
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

export default TvShowDetails;
