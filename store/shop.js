export const state = () => ({
  shop: null
});

export const actions = {
  async get({ commit, rootState }, params) {
    console.log("11", params);
    return await this.$axios
      .get(params)
      .then(res => {
        if (res.status === 200) {
          commit("SET_SHOP", res.data);
          return res.state
        }
      });

  }
};

export const mutations = {
  SET_SHOP(state, params) {
    state.shop = params;
  }
};
