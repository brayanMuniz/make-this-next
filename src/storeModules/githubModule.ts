import { Module } from 'vuex';
import { ActionTree } from 'vuex';
import { GetterTree } from 'vuex';
import { MutationTree } from 'vuex';
import { gitHubState } from './githubTypes'

import { execute, makePromise } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

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
  async repoQueryRequest({ getters }, payload: any) {
    if (payload.searchQuery == null) {
      alert('Type in a valid Search')
      return Promise.reject('Search Query Missing')
    }
    const uri = "https://api.github.com/graphql";
    const link = new HttpLink({
      uri,
      headers: {
        Authorization: "Bearer ".concat(getters.getUserGitHubToken)
      }
    });
    // split this up into somewhere for DRY
    const operation = {
      query: gql`
            query($querySearch: String!, $afterCursor: String) {
              search(query: $querySearch, after: $afterCursor, type: REPOSITORY, first: 20) {
                edges {
                  cursor
                  node {
                    ... on Repository {
                      name
                      collaborators(first: 4) {
                        edges {
                          node {
                            name
                            avatarUrl
                          }
                        }
                      }
                      id
                      forkCount
                      isFork
                      stargazers(first: 5) {
                        nodes {
                          avatarUrl
                          url
                          websiteUrl
                          name
                        }
                      }
                      nameWithOwner
                      url
                      createdAt
                      description
                      homepageUrl
                      forkCount
                      primaryLanguage {
                        name
                        id
                      }
                      languages(first: 5) {
                        nodes {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
      variables: {
        querySearch: payload.searchQuery,
        afterCursor: payload.cursor,
      }
    };
    return await makePromise(execute(link, operation))
  },
};
export const githubModule: Module<gitHubState, any> = {
  state, getters, mutations, actions
}