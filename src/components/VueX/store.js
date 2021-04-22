import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: '',
}

const mutations = {
    mutationsShowDialog(state, n = '0') {
        return state.count = n
    },
}


export default new Vuex.Store({
    state,
    mutations
})
