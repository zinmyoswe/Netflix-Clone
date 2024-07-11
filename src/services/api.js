// src/services/api.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;  // Get the API key from environment variables
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async (category) => {
  const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || 'Failed to fetch movie details');
    }
    return data;
  };

  export const getTvShowDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/tv/${movieId}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || 'Failed to fetch tv details');
    }
    return data;
  };


  export const getMovieTrailer = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || 'Failed to fetch movie trailer');
    }
    return data;
  };

  export const getTVTrailer = async (movieId) => {
    const response = await fetch(`${BASE_URL}/tv/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || 'Failed to fetch tv trailer');
    }
    return data;
  };


// Add the missing functions
export const getTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data.results;
};

export const getBlockbusterMovies = async () => {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  return data.results;
};

export const getOnlyOnNetflix = async () => {
  const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data.results;
};

export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data.results;
};

export const getTopPickForYou = async () => {
  const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  return data.results;
};


// latest add
export const getKdramas = async () => {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&region=KR&with_genres=18&with_origin_country=KR&page=1&sort_by=air_date.desc`);
    const data = await response.json();
    return data.results;
  };
  
  export const getActionMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`);
    const data = await response.json();
    return data.results;
  };
  
  export const getSoutheastAsianMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US`);
    const data = await response.json();
    return data.results;
  };
  
  export const getChineseTvShows = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=CN&language=en-US&page=1&sort_by=popularity.desc`);
    const data = await response.json();
    return data.results;
  };
  
  export const getKoreanTvShows = async () => {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_origin_country=KR&language=en-US`);
    const data = await response.json();
    return data.results;
  };
  
  export const getComedyMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`);
    const data = await response.json();
    return data.results;
  };
  
  export const getUsTvDramas = async () => {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18&language=en-US`);
    const data = await response.json();
    return data.results;
  };

  // New functions for Thailand and India movies
  export const getThailandPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=TH&language=en-US&sort_by=popularity.desc`);
    const data = await response.json();
    return data.results;
  };
  
  
  export const getIndiaMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=IN&language=en-US`);
    const data = await response.json();
    return data.results;
  };

  // New function to search movies
  export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&language=en-US`);
    const data = await response.json();
    return data.results;
  };

  //for categorydetailpage
  export const getTVShowsByCategory = async (categoryId) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${categoryId}&language=en-US`);
    return response.json();
  };

  export const getMoviesByCategory = async (categoryName) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categoryName}`);
    const data = await response.json();
    return data;
  };
