import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task =>{
      if( new Date(task.date) < new Date()){
        task.status = 'outdated'
      }
      return task
    })
  },
  mutations: {
    createTask(state, task){
      state.tasks.push(task)

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, description, date}){
      const tasks = state.tasks.concat()// копируем массив tasks

      const idx = tasks.findIndex(t=>
          t.id===id)
      const task = tasks[idx]

      const status = new Date(date) > new Date() ? 'active' : 'outdated'

      tasks[idx] = {...task, date: date, description: description, status: status}

      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify((state.tasks)))
    },
    completeTask(state, id){
      const idx = state.tasks.findIndex(t=> t.id === id)
      state.tasks[idx].status = 'completed'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({commit},task){
      commit('createTask', task)// инициация мутации
    },
    updateTask({commit},task){
      commit('updateTask', task)
    },
    completeTask({commit}, id){
      commit('completeTask', id)
    }
  },
  modules: {
  },
  getters:{
    tasks(state){
      return state.tasks
    },
    taskById(state){
      return function(id) {
        return state.tasks.find(t=> t.id === id)
      }
    }
  }
})
