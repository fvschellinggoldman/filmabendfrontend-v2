export type Movie = {
    id: number
    name: string
    posterPath: string
    rateable?: boolean
    votes: string[]
    votedForByCurrentUser: boolean
    averageRating?: number
}

export type MovieSearchResult = {
    title: string
    originalTitle?: string
    releaseDate: Date
    tmdbId: number
}