export const state = () => ({
    ws_conn: null
});

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

export const actions = {

    buy({ commit, rootState, dispatch }, sw_token) {
        console.log(window.device_fcmtoken);
        var list = rootState.product.cart_list;
        var to = "fKK6yhzqovg:APA91bH3yoToZMJbKHwad0yge6CokVz1QprJIPkcZN7eTsD056U4xo8JkU71HC7awAqxOGjopA0CETuTigtuiTl6shiWm4PJIWQe-eEDb8ob6oEwepUvkMkwk_0yMGgWOGpMYalK2lSE";


        var params = {
            shop_id: rootState.shop.s_id,
            state: 1,
            price: rootState.product.cart_display.total.price,
            cnt: rootState.product.cart_display.total.cnt,
            products: groupBy(list, 'p_id'),
            sw_token: to//window.device_fcmtoken 
        };

        this.$axios
            .put("/order", params)
            .then(res => {

                if (res.status == 200) {

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
