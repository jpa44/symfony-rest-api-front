import axios from 'axios';

export const getDocuments = ({ commit }, userToken) => {
    return new Promise((resolve, reject) => {
        axios.get('document',
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            }).then((response) => {
                commit('setDocuments', response.data)
                resolve();
            }).catch((error) => {
                reject(error);
            });
    })
}

export const getDocument = ({ commit }, value) => {
    return new Promise((resolve, reject) => {
        axios.get('document/' + value.documentId,
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

export const deleteDocument = ({ commit }, value) => {
    return new Promise((resolve, reject) => {
        axios.delete('document/' + value.documentId,
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

export const getDocumentType = ({ commit }, userToken) => {
    return new Promise((resolve, reject) => {
        axios.get('document_type',
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            }).then((response) => {
                commit('setDocumentType', response.data)
                resolve();
            }).catch((error) => {
                reject(error);
            });
    })
}

export const updateDocument = ({ commit }, value) => {
    return new Promise((resolve, reject) => {
        axios.patch('document/' + value.documentId,
            JSON.stringify({
                "title": value.title,
                "description": value.description,
                "documentType": value.documentType
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${value.userToken}`
                }
            }).then((response) => {
                commit('setDocuments', response.data)
                resolve();
            }).catch((error) => {
                reject(error);
            });
    })
}

export const newDocumentType = ({ commit }, value) => {
    return new Promise((resolve, reject) => {
        axios.post('document_type',
            JSON.stringify({
                "name": value.name,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${value.userToken}`
                }
            }).then((response) => {
                commit('setDocumentType', response.data)
                resolve();
            }).catch((error) => {
                reject(error);
            });
    })
}

export const deleteDocumentType = ({ commit }, value) => {
    return new Promise((resolve, reject) => {
        axios.delete('document_type/' + value.documentTypeId,
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