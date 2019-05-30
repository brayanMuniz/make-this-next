export interface userAuth {
    userName: string;
    profileImgLink?: URL;
    dateCreated: Date;
}

export interface userState {
    userAuth?: userAuth;
    token: string;
}

export interface simpleUserData {
    userName: string;
    dateCreated: Date;
    userUID: string;
    profileImgLink?: URL;
}

export interface userAuthentication {
    email: string;
    password: string;
}

export interface newUser {
    userAuth: userAuth,
    userAuthentication: userAuthentication
}
