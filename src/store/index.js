import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: '',
    chosenItem: {},
    ids: [],
    noGroupItems: [],
    itemChose: false,
    rscs: [],
    username:''

}

const mutations = {
    mutationsShowDialog(state, n = '0') {
        return state.count = n
    },
    mutationsUsername(state,data) {
        return state.username = data
    },
    mutationsitemChose(state, data) {
        if (data.id == "ms-drbd" || data.id == "drbd-ps:0" || data.id == "drbd-ps:1") {
            return state.itemChose = false
        } else {
            return state.itemChose = true
        }
    },
    mutationsUpdateChosenItem(state, data) {
        for (let i in data) {
            state.chosenItem[i] = data[i]
        }
        return state.chosenItem
    },
    mutationsNoGroupItems(state, data) {
        for (let i in data) {
            state.noGroupItems[i] = data[i]
        }
        return state.noGroupItems
    },
    mutationsIds(state, data) {
        for (let i in data) {
            state.ids[i] = data[i]
        }
        return state.ids
    },
    mutationsRscs(state, data) {
        for (let i in data) {
            state.rscs[i] = data[i]
        }
        return state.rscs
    },
}

export default new Vuex.Store({
    state,
    mutations,
})
