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
        //update og
        var p_id = params.p_id, og = params.og, o = params.o;
        var list = params.list;
        og.select_opt_id = o.o_id;
        og.select_opt_name = o.o_nm;
        og.select_opt_price = o.o_price;
        var p_obj = list.find(el => el.p_id == p_id);
        var og_obj = p_obj.og.find(el => el.og_id == og.p_id);
        //update product
        var total_og_price = 0;
        for (var i in p_obj.og) {
            total_og_price = total_og_price + p_obj.og[i].select_opt_price;
        }
        p_obj.total_og_price = total_og_price;
        p_obj.total_p_price = p_obj.p_price + p_obj.total_og_price;
    },

};
