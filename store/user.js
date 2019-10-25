export const state = () => ({
    type: null,
    id: null,
    name: null,
    img: null,
    email: null,
});


export const getters = {
    user_type(state) {
        if (state.type == null) {
            return "x";
        } else {
            return state.type.charAt(0)
        }
    }
}


export const actions = {
    async in({ commit, rootState, dispatch }, data) {
        commit("IN", data);
    },

    async out({ commit, rootState, dispatch, state }) {
        commit("OUT");
    },

};

export const mutations = {

    IN(state, params) {
        state.type = params.type;
        state.id = params.id;
        state.name = params.name;
        state.img = params.img;
        state.email = params.email;
    },
    OUT(state, params) {
        state.type = null;
        state.id = null;
        state.name = null;
        state.img = null;
        state.email = null;
    },
};
