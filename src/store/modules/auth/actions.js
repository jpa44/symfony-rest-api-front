import axios from 'axios';

export const logIn = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        axios.post('login',
            JSON.stringify({
                "email": user.email,
                "password": user.password
            }),
            {
                headers: { "Content-Type": "application/json" }
            }).then((response) => {
                commit('setUserToken',response.data.token)
                resolve();
            }).catch((error) => {
                reject(error);
            });
    })
}


export const getAuthUser = ({ commit, state }) => {
    return new Promise((resolve, reject) => {
        axios.get('user',
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.userToken}`
                }
            }).then((response) => {
                commit('setAuthUser', JSON.parse(response.data))
                resolve();
            }).catch((error) => {
                reject(error);
            });
    })
}

export const logOut = async ({ commit }) => {
    commit('logOut')
}