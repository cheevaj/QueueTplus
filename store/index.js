export const state = () => ({
  tokenShow: [],
  queue: [],
  queue_use: {},
})
export const mutations = {
  SET_QUEUE(state, updatedQueue) {
    state.queue = updatedQueue
  },
  SET_QUEUE_USE(state, updatedQueue) {
    state.queue_use = updatedQueue
  },
  setToken(state, value) {
    state.tokenShow = value
  },
}
