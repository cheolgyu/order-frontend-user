export const state = () => ({
    ws_conn: null
});

export const actions = {
    set({ commit, rootState }, params) {
        commit("SET_CONN", params);
    },
    push({ commit, rootState }, params) {
        commit("PUSH", params);
    },

};

export const mutations = {
    SET_CONN(state, params) {
        state.ws_conn = params;
    },
    PUSH(state, params) {
        state.ws_conn.send(params);
    },


};
