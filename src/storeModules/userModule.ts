import { Module } from 'vuex';
import { ActionTree } from 'vuex';
import { GetterTree } from 'vuex';
import { MutationTree } from 'vuex';
import { userState, userAuth } from './userTypes';

import firebase from '@/firebaseConfig'
let auth = firebase.firebase.auth();
let db = firebase.firebase.firestore()
let firebaseRef = firebase.firebase

export const state: userState = {
    userAuth: undefined,
    token: ''
};

export const getters: GetterTree<userState, any> = {
    getUserData(state): object {
        if (state.userAuth === undefined) return {}
        return state.userAuth
    },
    getUserGitHubToken(state): string {
        if (state.token.length > 1) return state.token
        return ''
    },
    isUserSignedIn: () => {
        if (auth.currentUser) {
            return true;
        } else {
            return false;
        }
    },
};

export const mutations: MutationTree<userState> = {
    updateAuthData(state, payload: userAuth) {
        state.userAuth = payload;
    },
    userDataLoaded(state, payload: any) {
        state.token = payload.token
    },
    clearUserData(state) {
        state.userAuth = undefined;
    }
};

export const actions: ActionTree<userState, any> = {
    // **** Making the user
    async oauthWithGitHub({ dispatch, commit }) {
        let githubProvider = new firebaseRef.auth.GithubAuthProvider();
        githubProvider.addScope('public_repo, read:org, read:user, read:packages'); // reads only
        auth.signInWithPopup(githubProvider)
            .then(async (result: any) => {
                if (result === null || result === undefined) return 'result is null' // Todo: would need to configure something
                var token = result.credential.accessToken;
                await dispatch('addGitHubTokenFB', token).then(() => {
                    commit('userDataLoaded', token)
                })
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
    async getAndSetUserData({ commit }) {
        if (auth.currentUser === null || auth.currentUser === undefined) return Promise.reject('User not authorized')
        console.log('Getting User data....')
        let userData = await db.collection('Users').doc(auth.currentUser.uid).get()
        // Todo: if user Data is undefined return null or something 
        commit('userDataLoaded', userData.data());
        console.log('Commited userData')
        return userData.data();
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