import { Module } from 'vuex';
import { ActionTree } from 'vuex';
import { GetterTree } from 'vuex';
import { MutationTree } from 'vuex';
import { gitHubState } from './githubTypes'

import firebase from '@/firebaseConfig'
let auth = firebase.firebase.auth();
let db = firebase.firebase.firestore()
let firebaseRef = firebase.firebase


export const state: gitHubState = {
    token: '',
    endPoint: 'https://api.github.com/graphql'
};

export const getters: GetterTree<gitHubState, any> = {
    getEndPoint(state): string {
        return state.endPoint
    },
};

export const mutations: MutationTree<gitHubState> = {

};

export const actions: ActionTree<gitHubState, any> = {

};
export const userModule: Module<gitHubState, any> = {
    state, getters, mutations, actions
}