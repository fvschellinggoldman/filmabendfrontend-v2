import { Movie } from "./movie"

export type RatingQueueElement = {
    state: RatingState
    breakdown: UserBasedRating[]
    movie: Movie
    currentUserHasRated: boolean
}

type UserBasedRating = {
    userId: string
    displayName: string
    rating: number
}

export enum RatingState {
    RECENTLY_RATED = "recently_rated",
    OPEN = "open",
    ARCHIVED = "archived"
}