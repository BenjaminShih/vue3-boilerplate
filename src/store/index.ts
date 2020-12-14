
// https://next.vuex.vuejs.org/

import { createStore, Module, StoreOptions } from 'vuex'

export interface State {
    who: string;
}

export interface ModuleAState {
    count: number;
}

export interface ModuleBState {
    status: string;
}

const moduleA: Module<ModuleAState, any> = {
    namespaced: true,
    state() {
        return {
            count: 0
        }
    },
    getters: {
        getterA(state: ModuleAState) {
            console.log('moduleA-getterA', state);
            return state.count * 2
        },
    },
    mutations: {
        mutationA(state: ModuleAState) {
            state.count++
            console.log('moduleA-mutationA', state);
        }
    },
    actions: {
        actionA(context: any) {
            setTimeout(() => {
                context.commit('moduleA-actionA', context)
            }, 1000)
        }
    }
}

const moduleB: Module<ModuleBState, any> = {
    namespaced: true,
    state() {
        return {
            status: '起床'
        }
    },
    getters: {
        getterA(state: ModuleBState) {
            console.log('moduleA-getterB', state);
            return '我 ' + state.status
        }
    },
    mutations: {
        mutationA(state: ModuleBState) {
            console.log('moduleA-mutationA', state);
        }
    },
    actions: {
        actionA({ state }) {
            setTimeout(() => {
                console.log('moduleA-actionA', state);
            }, 1000)
        }
    }
}

const storeOptions: StoreOptions<State> = {
    state: {
        who: '我'
    },
    getters: {
        rootGetter(state: State) {
            console.log('rootGetter', state);
            return state.who + '666'
        },
    },
    mutations: {
        rootMutation(state: State) {
            state.who = state.who + '和你'
            console.log('rootMutation', state);
        }
    },
    actions: {
        rootAction(context: any) {
            setTimeout(() => {
                context.commit('rootAction', context)
            }, 1000)
        }
    },
    modules: {
        moduleA,
        moduleB
    }
}


const store = createStore(storeOptions)

export default store