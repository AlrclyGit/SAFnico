import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            lists: []
        }
    },
    mutations: {
        listCover(state, data) { // 覆盖
            state.lists = data
        },
        listJoin(state, data) { // 尾部
            state.lists = state.lists.concat(data)
        },
        listUnshift(state, data) { // 头部
            state.lists.unshift(data)
        },
        listDelete(state, data) { // 删除
            state.lists = state.lists.filter((currentValue) => {
                return currentValue.id === data ? false : true
            })
        },
        listUpdata(state, data) { //更新
            state.lists.forEach((currentValue, index, arr) => {
                if (currentValue.id == data.id) {
                    arr[index] = data
                }
            });
        },

    }
})

