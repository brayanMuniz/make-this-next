export interface gitHubState {
    token: string;
    endPoint: 'https://api.github.com/graphql';
}

export interface filters {
    languages?: [];
    collaborators?: Number;
    forkCount?: Number;
    isFork?: Boolean;
    dateStart?: Date; // pass this date true,
    primaryLanguage?: String;
}