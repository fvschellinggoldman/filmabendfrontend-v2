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

export type MovieSearchResult = {
    title: string
    originalTitle?: string
    releaseDate: Date
    tmdbId: number
}

export type MovieSuggestion = MovieSearchResult &
 {
    moviePosterData: MovieImageMetaData
    eventId: number
 }

export type MovieImageMetaData = {
    filepath?: string
    averageImageColors?: number[]
}