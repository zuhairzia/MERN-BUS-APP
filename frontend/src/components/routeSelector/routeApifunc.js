import api from '../API/api'

export async function getRoutesFromApi(startCity, destination) {
    let incoming = await api.post('/booking/', { startCity, destination })
    return incoming
}