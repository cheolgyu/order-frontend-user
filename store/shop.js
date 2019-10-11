export const state = () => ({
  s_info: null,
  products: {
    edit: null
  }
});

export const actions = {
  async  info({ commit, rootState, dispatch }, params) {
    let { data } = await this.$axios.get(params);
    if (data.status === 200) {
      commit("SET_SHOP", data.data.shop_info.s_info);
      dispatch("product/set_list", data.data.shop_info.s_info.p, { root: true });
    }
  },
  chg_option_group({ commit, rootState }, params) {
    commit("LIST_CHG_OPTION_GROUP", params)
  }
};

export const mutations = {
  SET_SHOP(state, params) {
    state.s_info = params;
  },
  LIST_CHG_OPTION_GROUP(state, params) {

  },

};
