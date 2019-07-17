export const state = () => ({
  shop: null,
  products: null
});

export const actions = {
  get({ commit, rootState }, params) {
    console.log("11", params);
    return this.$axios
      .get(params)
      .then(res => {
        if (res.status === 200) {
          console.log("SET_SHOP", res.data.data);
          commit("SET_SHOP", res.data.data);
          return res.state
        }
      });

  }
};

export const mutations = {
  SET_SHOP(state, params) {
    state.shop = params.shop;
    state.products = params.product;
  }
};
