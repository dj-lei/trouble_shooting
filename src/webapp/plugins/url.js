const axios = require('axios')
axios.defaults.withCredentials = true

const url = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 60000,
});

module.exports = url