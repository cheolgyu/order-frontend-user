export const state = () => ({
    fcmToken: null
})

export const actions = {
    set_fcm({ commit, rootState }, params) {
        console.log("action set_fcm", params);
        commit("SET_FCM", res.data.data.shops);
    },
};

export const mutations = {
    SET_FCM(state, data) {
        console.log("action SET_FCM", data);
        state.fcmToken = data;
        console.log(state.fcmToken);
    },

}
