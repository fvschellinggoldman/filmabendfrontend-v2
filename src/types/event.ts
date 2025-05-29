import { Movie } from "./movie";
import { EventSubmitter } from "./user";

export type Event = {
  name: string;
  imageUrl: string;
  id: number;
  closed: boolean;
  movies: Movie[];
  submitter: EventSubmitter;
};
