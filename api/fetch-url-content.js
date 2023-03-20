const axios = require('axios')

exports.fetchUrlContent = url => {
    return axios.get(url)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
}