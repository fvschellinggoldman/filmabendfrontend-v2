import { UserBasedRating } from "./rating"

export type Movie = {
    id: number
    name: string
    moviePosterData: MovieImageMetaData
    rateable?: boolean
    ratingClosedOn?: Date
    votes: string[]
    votedForByCurrentUser: boolean
    averageRating?: number
    genres: string[]
    tmdbId: number
}

export type MovieDetail = Movie & {
    description: string
    runtime: number
    releaseDate: Date
    season: number
    categoryName?: string
    imdbRating?: number
    breakdown?: UserBasedRating[]
}

export type MovieSearchResult = {
    title: string
    originalTitle?: string
    releaseDate: Date
    tmdbId: number
}

export type MovieSuggestion = MovieSearchResult &
 {
    moviePosterPath: string
    eventId: number
    id: number
 }

export type MovieImageMetaData = {
    filepath?: string
    averageImageColors?: number[]
}