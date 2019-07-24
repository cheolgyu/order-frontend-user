export const state = () => ({
    list: [],
    show: {
        items: [],
        total: {
            price: null,
            cnt: null,
        }
    }
});

export const actions = {
    push({ commit, rootState }, params) {
        commit("PUSH", JSON.parse(JSON.stringify(params)));
    },
    make_total({ commit, rootState }, params) {
        commit("MAKE_TOTAL", params);
    },
    chg_option_group({ commit, rootState }, params) {
        commit("CHG_OPTION_GROUP", params)
    },
    remove_product({ commit, rootState }, params) {
        commit("REMOVE_PRODUCT", params)
    },
    show_simple_list({ commit, rootState }, params) {
        commit("SHOW_SIMPLE_LIST", params)
    }
};

export const mutations = {
    PUSH(state, params) {
        state.list.push(params);
    },
    MAKE_TOTAL(state, params) {
        //
        console.log("총상품가격 만들기")
        var price = 0;
        var options_price = 0;
        for (var i in state.list) {

            var p = state.list[i];
            price += p.price;

            for (var j in p.option_group_list) {
                var option_group = p.option_group_list[j];
                var opt_id = option_group.default;
                var opt = option_group.option_list.find(function (element) {
                    return element.id == opt_id;
                });

                options_price += opt.price;
            }
        }
        state.show.total.price = price + options_price;
        state.show.total.cnt = state.list.length;
    },
    CHG_OPTION_GROUP(state, params) {
        var p = state.list.find(function (element) {
            return element.id == params.p_id;
        });
        var optg = p.option_group_list.find(function (element) {
            return element.id == params.optg_id;
        });
        optg.default = params.option.id;
    },
    REMOVE_PRODUCT(state, params) {
        var index = state.list.find(function (element, index) {
            console.log("111111111111111111", element, index, params)
            if (element.id == params.id) {
                console.log("22222222222", element, index)
                return index;
            }
        });
        console.log("333333333333", index)
        state.list.splice(index, 1);

    },
    SHOW_SIMPLE_LIST(state, params) {
        var show = [];
        for (var i = 0; i < state.list.length; i++) {
            var ii = {}
            Object.assign(ii, state.list[i]);
            ii.cnt = 1;
            var not_exist = true;
            for (var j = 0; j < show.length; j++) {
                var jj = show[j];
                if (ii.id == jj.id) {
                    jj.cnt++
                    not_exist = false
                }
            }
            if (not_exist) {
                show.push(ii)
            }

        }
        state.show.items = show;
        console.log("show", show)

    },


};
