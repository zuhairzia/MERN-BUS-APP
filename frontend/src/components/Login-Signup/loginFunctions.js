import api from '../API/api'

export function logUserIn(userCredentials) {
    return api.post('/login', userCredentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export function loadRoutes(){
    const authToken = sessionStorage.getItem('authToken' || '')
    return api.get(`/user/profile?secret_token=${authToken}`)
}

export function getCurrentUserDetails(authToken){
    const token =  authToken
    return api.get(`/user/profile?secret_token=${token}`)
}