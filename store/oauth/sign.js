export const state = () => ({
    type: null,
    email: null,
    id: null

});

export const actions = {

    async in({ commit, rootState, dispatch }) {

    },

    async out({ commit, rootState, dispatch, state }) {

    },

};

export const mutations = {
    SET_TOKEN(state, params) {
        state.access_token = params;
    },
};
