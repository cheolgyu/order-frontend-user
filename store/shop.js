export const state = () => ({
  shop: null,
  products: {
    orgin: null,
    edit: null
  }
});

export const actions = {
  get({ commit, rootState, dispatch }, params) {
    console.log("11", params);
    return this.$axios
      .get(params)
      .then(res => {
        if (res.status === 200) {
          console.log("SET_SHOP", res.data.data);
          commit("SET_SHOP", res.data.data);
          dispatch("ws/join", null, { root: true });
          return res.state
        }
      });

  },
  chg_option_group({ commit, rootState }, params) {
    commit("CHG_OPTION_GROUP", params)
  }
};

export const mutations = {
  SET_SHOP(state, params) {
    state.shop = params.shop;
    state.products.orgin = params.product;
    state.products.edit = params.product;
  },
  CHG_OPTION_GROUP(state, params) {
    var p = state.products.edit.find(function (element) {
      return element.id == params.p_id;
    });
    var optg = p.option_group_list.find(function (element) {
      return element.id == params.optg_id;
    });
    optg.default = params.option.id;
  },

};
