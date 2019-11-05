export const state = () => ({
    list: [],
    cart_list: [],
    cart_display: {
        items: [],
        total: {
            price: null,
            cnt: null,
        }
    }
});

export const actions = {
    init_list({ commit, rootState }, params) {
        for (var i = 0; i < params.length; i++) {
            if (params[i].og[0].og_id == null) {
                params[i].og = [];
            }
        }
        commit("INIT_LIST", params);
    },
    comm_update_og({ commit, rootState }, params) {
        commit("COMM_UPDATE_OG", params);
    },
    cart_item_push({ commit, rootState }, params) {
        commit("CART_PUSH", JSON.parse(JSON.stringify(params)));
    },
    cart_item_remove({ commit, rootState }, params) {
        commit("CART_ITEM_REMOVE", params)
    },
    cart_update({ commit, rootState }, params) {
        commit("CART_UPDATE", params);
    },

};


export const mutations = {
    INIT_LIST(state, params) {
        state.list = params;
    },
    COMM_UPDATE_OG(state, params) {
        //update og
        var p_id = params.p_id, og = params.og, o = params.o;
        og.select_opt_id = o.o_id;
        og.select_opt_name = o.o_nm;
        og.select_opt_price = o.o_price;
        var p_obj = params.list.find(el => el.p_id == p_id);
        //var og_obj = p_obj.og.find(el => el.og_id == og.p_id);
        //update product
        var total_og_price = 0;
        for (var i in p_obj.og) {
            total_og_price = total_og_price + p_obj.og[i].select_opt_price;
        }
        p_obj.total_og_price = total_og_price;
        p_obj.total_p_price = p_obj.p_price + p_obj.total_og_price;
    },
    CART_UPDATE(state, params) {
        cart_update(state)
    },
    CART_ITEM_REMOVE(state, idx) {
        state.cart_list.splice(idx, 1);
        cart_update(state);
    },
    CART_PUSH(state, params) {
        state.cart_list.push(params);
        cart_update(state);
    },

};
function cart_update(state) {
    cart_update_item(state);
    cart_update_total(state);
}

function cart_update_item(state) {
    var cart_display = [];
    for (var i = 0; i < state.cart_list.length; i++) {
        var ii = {}
        Object.assign(ii, state.cart_list[i]);
        ii.cnt = 1;
        var not_exist = true;
        for (var j = 0; j < cart_display.length; j++) {
            var jj = cart_display[j];
            if (ii.p_id == jj.p_id) {
                jj.cnt++
                not_exist = false
            }
        }
        if (not_exist) {
            cart_display.push(ii)
        }

    }
    state.cart_display.items = cart_display;
}
function cart_update_total(state) {
    var total_cart_price = 0;
    for (var i in state.cart_list) {

        total_cart_price += state.cart_list[i].total_p_price;

    }
    state.cart_display.total.price = total_cart_price;
    state.cart_display.total.cnt = state.cart_list.length;
}

