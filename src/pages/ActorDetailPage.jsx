import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ActorDetailPage.css';

const ActorDetailPage = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        // Fetch actor details
        const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const data = await response.json();

        if (!data || data.status_code) {
          throw new Error('Actor not found');
        }
        setActor(data);

        // Fetch actor's movie credits
        const movieCreditsResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const movieCreditsData = await movieCreditsResponse.json();
        setMovieCredits(movieCreditsData.cast || []);

        // Fetch actor's TV credits
        const tvCreditsResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}/tv_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const tvCreditsData = await tvCreditsResponse.json();
        setTvCredits(tvCreditsData.cast || []);
      } catch (error) {
        console.error('Error fetching actor details:', error);
        setError(error.message);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  // Function to calculate age from birthday
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="actor-detail">
      <div className="actor-detail-content">
        <div className="actor-detail-photo">
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
          />
        </div>
        <div className="actor-detail-info">
          <h1>{actor.name}</h1>
          <p><strong>Biography:</strong> {actor.biography || 'No biography available'}</p>
          <p><strong>Birthday:</strong> {actor.birthday} ({calculateAge(actor.birthday)} years old)</p>
          <p><strong>Place of Birth:</strong> {actor.place_of_birth || 'Unknown'}</p>
          <p><strong>Known For:</strong> {actor.known_for_department || 'Not specified'}</p>
          <div className="actor-detail-social-media">
            {actor.facebook_id && (
              <a href={`https://www.facebook.com/${actor.facebook_id}`} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
            {actor.twitter_id && (
              <a href={`https://twitter.com/${actor.twitter_id}`} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
            {actor.instagram_id && (
              <a href={`https://www.instagram.com/${actor.instagram_id}`} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {actor.youtube_id && (
              <a href={`https://www.youtube.com/channel/${actor.youtube_id}`} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            )}
            {actor.homepage && (
              <a href={actor.homepage} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            )}
          </div>
          <div className="actor-detail-movies">
            <h2>Movies Featuring {actor.name}</h2>
            {movieCredits.length > 0 ? (
              <ul>
                {movieCredits.map((movie) => (
                  <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <p>{movie.title}</p>
                      <p>{movie.release_date}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No movies available</p>
            )}
          </div>
          <div className="actor-detail-tv">
            <h2>TV Shows Featuring {actor.name}</h2>
            {tvCredits.length > 0 ? (
              <ul>
                {tvCredits.map((tv) => (
                  <li key={tv.id}>
                    <Link to={`/tv/${tv.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                        alt={tv.name}
                      />
                      <p>{tv.name}</p>
                      <p>{tv.first_air_date}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No TV shows available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetailPage;
