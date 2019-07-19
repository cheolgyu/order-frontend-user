export const state = () => ({
    list: [],
    show: []
});

export const actions = {
    push({ commit, rootState }, params) {
        commit("PUSH", params);
    }
};

export const mutations = {
    PUSH(state, params) {
        state.list.push(params);
        var item = state.show.find(item => item.id === params.id);
        if (item === undefined) {
            item = {}
            Object.assign(item, params);

            item.cnt = 1
            state.show.push(item);

        } else {
            item.cnt++

        }
    }
};
