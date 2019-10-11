export const state = () => ({
    list: [],
    cart_list: [],
});

export const actions = {
    set_list({ commit, rootState }, params) {
        commit("SET_LIST", params);
    },
    update_og({ commit, rootState }, params) {
        commit("UPDATE_OG", params);
    },
    get_price({ commit, rootState }, params) {
        commit("CART_CHG_OPTION_GROUP", params)
    }
};

export const mutations = {
    SET_LIST(state, params) {
        state.list = params;
    },
    UPDATE_OG(state, params) {

    },


};
