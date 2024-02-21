export type RatingStatus = {
    state: RatingState
    breakdown: UserBasedRating[]
    currentUserHasRated: boolean
}


export type UserBasedRating = {
    userId: string
    displayName: string
    rating: number
}

export enum RatingState {
    RECENTLY_RATED = "recently_rated",
    OPEN = "open",
    ARCHIVED = "archived"
}