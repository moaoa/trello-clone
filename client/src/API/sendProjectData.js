import axios from 'axios'

export default async function(data, token) {

    return await axios.post('/projects', data, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
}