import Vue from "vue"

export const modals = {
    namespaced: true,
    state: {
        showModal: false,
        title: "",
        message: "",
        subMessage: "",
        routeName: ""
    },
    actions: {
        openModal({ commit }) {
            commit('open');
        },
        closeModal({ commit }) {
            commit('close');
        },
        setModalInfo({ commit }, info) {
            commit('setModalInfo', info)
        },
        resetModal({ commit }) {
            commit('reset');
        }
    },
    mutations: {
        open(state) {
            Vue.set(state, 'showModal', true);
        },
        close(state) {
            Vue.set(state, 'showModal', false);
        },
        setModalInfo(state, { title, message, subMessage, routeName }) {
            Vue.set(state, 'title', title);
            Vue.set(state, 'message', message);
            Vue.set(state, 'subMessage', subMessage ?? "");
            Vue.set(state, 'routeName', routeName ?? "");
        },
        reset(state) {
            Vue.set(state, 'title', "");
            Vue.set(state, 'message', "");
            Vue.set(state, 'subMessage', "");
            Vue.set(state, 'routeName', "");
            Vue.set(state, 'showModal', false);
        }
    },
    getters: {
        isOpen: state => state.showModal,
        getModalTitle: state => state.title,
        getModalMessage: state => state.message,
        getModalSubMessage: state => state.subMessage,
        getRouteName: state => state.routeName
    }
}