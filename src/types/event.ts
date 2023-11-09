import { Movie } from "./movie"

export type Event = { 
    name: string
    imagePath: string
    id: number
    movies: Movie[]
}