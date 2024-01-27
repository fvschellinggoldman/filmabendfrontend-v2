import { Movie } from "./movie"
import { User } from "./user"

export type Category = { 
    name: string
    imageUrl: string
    id: number
    creator: User
    creationDate: Date
    season: number
    selected: boolean
    averageRating?: number
    watchedMovies?: Movie[]
}