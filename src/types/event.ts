import { Movie, MovieSuggestion } from "./movie"

export type Event = { 
    name: string
    imageUrl: string
    id: number
    closed: boolean
    movies: Movie[]
    submitterId: string
    suggestions: MovieSuggestion[]
}