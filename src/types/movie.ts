import { UserBasedRating } from "./rating";

export type Movie = {
  id: number;
  name: string;
  moviePosterData: MovieImageMetaData;
  rateable?: boolean;
  ratingClosedOn?: string;
  votes: string[];
  votedForByCurrentUser: boolean;
  averageRating?: number;
  genres: string[];
  tmdbId: number;
  season: number;
  description: string;
};

export type MovieDetail = Movie & {
  runtime: number;
  releaseDate: Date;
  season: number;
  categoryName?: string;
  imdbRating?: number;
  breakdown?: UserBasedRating[];
};

export type MovieSearchResult = {
  title: string;
  originalTitle?: string;
  releaseDate: Date;
  tmdbId: number;
  addable: boolean;
};

export type MovieSuggestion = MovieSearchResult & {
  moviePosterPath: string;
  eventId: number;
  id: number;
};

export type MovieImageMetaData = {
  filepath?: string;
  averageImageColors?: number[];
};

export type UserRatedMovie = {
  movie: Movie;
  userId: string;
  rating: number;
};

type MovieRatingFilter = {
  ratingOperator?: string;
  ratingValue?: string;
};

export type MovieFilter = {
  rating?: MovieRatingFilter;
  season?: string;
  search?: string;
};
