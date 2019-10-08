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

    buy({ commit, rootState, dispatch }, sw_token) {
        var list = rootState.cart.list;


          var params = {
              shop_id: rootState.shop.shop.id,
              state: 1,
              price: rootState.cart.show.total.price,
              cnt: rootState.cart.show.total.cnt,
              products: groupBy(list,'id'),
              sw_token: sw_token
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
