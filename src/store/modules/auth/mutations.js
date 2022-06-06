export default {
    setAuthUser(state, user) {
        state.authUser = user
    },
    setUserToken(state, token) {
        state.userToken = token
    },
    logOut(state) {
        state.user = null
        state.userToken = null
    },
}