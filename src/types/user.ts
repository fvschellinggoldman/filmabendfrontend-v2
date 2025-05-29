export type User = {
    displayName: string,
    profilePicturePath: string
    showMobileSuggestionTutorial: boolean
    id: string;
    moderator: boolean;
    userPreference?: UserPreference
}

export type EventSubmitter = {
    name: string;
    profilePicturePath: string;
    id: string;
}

export type UserPreference = {
    showMobileTutorial: boolean,
    showWebTutorial: boolean,
    enableSafeMode?: boolean
}