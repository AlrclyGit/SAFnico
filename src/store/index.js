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
        listPush(state, data) {
            console.log(data)
            state.lists.push(data)
        },
        listUnshift(state, data) {
            state.lists.unshift(data)
        }
    }
})

