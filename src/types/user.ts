export type User = {
    displayName: string,
    profilePicturePath: string
    showMobileSuggestionTutorial: boolean
    id: string;
    moderator: boolean;
    userPreference?: UserPreference
}

export type UserPreference = {
    showMobileTutorial: boolean,
    showWebTutorial: boolean,
    safeMode?: boolean
}