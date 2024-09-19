export const state = () => ({
  tokenShow: [],
  queue: [],
  queue_use: {},
  branch_id:0,
  title:'',
})
export const mutations = {
  SET_QUEUE(state, updatedQueue) {
    state.queue = updatedQueue
  },
  removeQUEUE(state, id) {
    state.queue = state.queue.filter((item) => item.id !== id);
  },
  SET_QUEUE_USE(state, updatedQueue) {
    state.queue_use = updatedQueue
  },
  setToken(state, value) {
    state.tokenShow = value
  },
  SET_BRANCH(state, updatedbranchid){
    state.branch_id = updatedbranchid;
  },
  SET_TITLE(state, updatetitle){
    state.title = updatetitle;
  }
}
