import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            lists: []
        }
    },
    mutations: {
        listCover(state, data) {
            state.lists = data
        },
        listJoin(state, data) {
            state.lists = state.lists.concat(data)
        },
        listUnshift(state, data) {
            state.lists.unshift(data)
        }
    }
})

