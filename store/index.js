export const state = () => ({
  locales: ['en', 'ko'],
  locale: 'ko',
  shops: ['en', 'ko'],
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_SHOPS(state, params) {
    state.shops = params;
  },
}

export const getters = {
  get_shops(state) {
    return state.shops
  }
}


export const actions = {
  get_shops({ commit, rootState }, params) {
    return this.$axios
      .get("shops")
      .then(res => {
        if (res.status === 200) {
          commit("SET_SHOPS", res.data.data.shops);
          return res.state
        }
      });

  },
};