import { Module } from 'vuex';
import { ActionTree } from 'vuex';
import { GetterTree } from 'vuex';
import { MutationTree } from 'vuex';
import { userState, userAuth, simpleUserData } from './userTypes';

import firebase from '@/firebaseConfig'
let auth = firebase.auth;
let db = firebase.database
let firebaseRef = firebase

export const state: userState = {
    userAuth: undefined,
    token: ''
};

export const getters: GetterTree<userState, any> = {
    getUserData(state): object {
        if (state.userAuth === undefined) return {}
        return state.userAuth
    },
    getSimpleUserData(state): object {
        if (state.userAuth === undefined || auth.currentUser === null) return {}
        let mySimpleUserData: simpleUserData = {
            userName: state.userAuth.userName,
            dateCreated: state.userAuth.dateCreated,
            userUID: auth.currentUser.uid
        }
        return mySimpleUserData
    },
    getUserGitHubToken(state): string {

        return ''
    },
    userHasData(state): boolean {
        if (state.userAuth === undefined) return false
        return true
    },
    isUserSignedIn: (): boolean => {
        if (auth === undefined || auth === null) return false
        return true;
    },
};

export const mutations: MutationTree<userState> = {
    userAuthLoaded(state, payload: userAuth) {
        state.userAuth = payload;
    },
    clearUserData(state) {
        state.userAuth = undefined;
    }
};

export const actions: ActionTree<userState, any> = {
    // **** Making the user
    async oauthWithGitHub({ dispatch }) {
        let githubProvider = new firebaseRef.firebaseRef.auth.GithubAuthProvider();
        githubProvider.addScope('public_repo, read:org, read:user, read:packages'); // reads only
        auth.signInWithPopup(githubProvider)
            .then(async (result: any) => {
                if (result === null || result === undefined) return 'result is null' // Todo: would need to configure something
                var token = result.credential.accessToken;
                await dispatch('addGitHubTokenFB', token)
            }).catch(error => {
                console.log(error.code)
                console.log(error.message)
            });
    },
    async addGitHubTokenFB({ }, newToken) {
        if (auth.currentUser === null || auth.currentUser === undefined) return Promise.reject('Could not make user in DB. User not authenticated')
        console.log('Adding Github Token in DB...');
        return await db.collection('Users').doc(auth.currentUser.uid).update({
            token: newToken
        });
    },
    async githubSignout() {
        auth.signOut().then(() => {
            console.log('Signout successful!')
            return 'Signout successful!'
        }, error => {
            console.log('Signout failed')
            'Signout failed'
        })
    },
};

export const userModule: Module<userState, any> = {
    state, getters, mutations, actions
}