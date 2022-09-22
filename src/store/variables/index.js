import Vue from "vue"

export const variables = {
    namespaced: true,
    state: {
      pharmacyId:""
    },
    actions: {
        setPharmacyId({ commit }, pharmacyId) {
            commit('setPharmacyId', pharmacyId);
        }
    },
    mutations: {
        setPharmacyId(state, pharmacyId) {
            Vue.set(state, 'pharmacyId', pharmacyId);          
        } 
    },
    getters: {
      getPharmacyId: state => state.pharmacyId,
    }
}