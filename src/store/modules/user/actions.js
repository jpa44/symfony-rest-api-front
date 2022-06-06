import axios from 'axios';

export const getUsers = ({ commit }, userToken) => {
    return new Promise((resolve, reject) => {
        axios.get('users',
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            }).then((response) => {
                commit('setUsers', response.data)
                resolve();
            }).catch((error) => {
                reject(error);
            });
    })
}

export const deleteUser = ({ commit }, value) => {
    return new Promise((resolve, reject) => {
        axios.delete('user/' + value.userId,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${value.userToken}`
                }
            }).then((response) => {
                commit('setDocument', response.data)
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    })
}

export const newUser = ({ commit }, value) => {
    return new Promise((resolve, reject) => {
        axios.post('user',
            JSON.stringify({
                "firstName": value.firstName,
                "email": value.email,
                "roles": value.roles,
                "password": value.password
            }),
            {
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${value.userToken}`
             }
            }).then((response) => {
                commit('setDocuments', JSON.parse(response.data))
                resolve();
            }).catch((error) => {
                reject(error);
            });
    })
}