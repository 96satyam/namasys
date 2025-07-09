export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type?: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Writer: string;
  Actors: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
  imdbVotes: string;
  Rated: string;
  Released: string;
  Country: string;
  Language: string;
  Awards: string;
}
