export type Movie = {
    id: number
    name: string
    moviePosterData: MovieImageMetaData
    rateable?: boolean
    votes: string[]
    votedForByCurrentUser: boolean
    averageRating?: number
    genres: string[]
}

export type MovieSearchResult = {
    title: string
    originalTitle?: string
    releaseDate: Date
    tmdbId: number
}

export type MovieImageMetaData = {
    filepath?: string
    averageImageColors?: number[]
}