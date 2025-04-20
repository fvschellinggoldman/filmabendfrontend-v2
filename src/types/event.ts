import { Movie } from "./movie";
import { User } from "./user";

export type Event = {
  name: string;
  imageUrl: string;
  id: number;
  closed: boolean;
  movies: Movie[];
  submitterId: string;
  creator?: User;
};
