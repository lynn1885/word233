export const state = () => ({
  currentPage: 1
})

export const mutations = {
  updateCurrentPage (state, currentPage) {
    state.currentPage = currentPage
  }
}
