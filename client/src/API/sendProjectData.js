import axios from 'axios'

export default async function(data) {

    return await axios.post('/projects', data, {
        headers: {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk3YzhkMzcwYzNjOTI3ZTQ4NGE2NDYiLCJpYXQiOjE2MDM4NzE5MTYsImV4cCI6MTYwMzk1ODMxNn0.EYk3BgBiNfbkPQiNeNeqBb7PeysCf8YrjrVnorCBwes'
        }
    })
}