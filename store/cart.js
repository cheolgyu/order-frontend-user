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
        commit("PUSH", params);
    }
};

export const mutations = {
    PUSH(state, params) {
        state.list.push(params);
        var item = state.show.items.find(item => item.id === params.id);
        // 중복상품 cnt 증가
        if (item === undefined) {
            item = {}
            Object.assign(item, params);

            item.cnt = 1
            state.show.items.push(item);

        } else {
            item.cnt++

        }
        //총상품가격 만들기
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


    }
};
