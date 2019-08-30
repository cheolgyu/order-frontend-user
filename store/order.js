export const state = () => ({
    ws_conn: null
});

export const actions = {

    buy({ commit, rootState }, sw_token) {
        var list = rootState.cart.list;
        var params = {
            shop_id: rootState.shop.shop.id,
            state: "req",
            price: 0.0,
            products: list,
            sw_token: { 'sw_token': sw_token }
        };
        this.$axios
            .put("/order", params)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    console.log(res);

                } else {
                }
            });
    },

};

export const mutations = {

    BUY(state, params) {
        state.ws_conn.send(JSON.stringify(params));
    },


};
