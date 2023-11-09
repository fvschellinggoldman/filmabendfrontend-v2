export type Movie = {
    id: number
    name: string
    posterPath: string
    ratingLocked?: boolean
}

export type MovieSearchResult = {
    title: string
    originalTitle?: string
    releaseDate: Date
    tmdbId: number
}