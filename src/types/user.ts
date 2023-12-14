export type User = {
    displayName: string,
    profilePicturePath: string
    showMobileSuggestionTutorial: boolean
    id: string;
    moderator: boolean;
}

export type UserPreference = {
    showMobileTutorial: boolean,
    showWebTutorial: boolean
}