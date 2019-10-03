export const state = () => ({
    ws_conn: null
});

const reducer = (accumulator, currentValue) => accumulator + currentValue;
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

    buy({ commit, rootState }, sw_token) {
        var list = rootState.cart.list;
        var params = {
            shop_id: rootState.shop.shop.id,
            state: 1,
            price: 0.0,
            products: list,
            sw_token: sw_token
        };

        var simple = list;

        console.log("=============order sort =======================");
        console.log(list);
        console.log(simple);
        var groupedPeople = groupBy(simple, 'id');
        console.log(groupedPeople);

        /*

        this.$axios
            .put("/order", params)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    console.log(res);

                } else {
                }
            });
            */
    },

};

export const mutations = {

    BUY(state, params) {
        state.ws_conn.send(JSON.stringify(params));
    },


};
