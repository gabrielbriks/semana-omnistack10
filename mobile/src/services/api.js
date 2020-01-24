import axios from 'axios';

const api = axios.create({
    baseURL:'http://10.101.0.189:3333/',
    //exp://10.101.0.189:19000
});

export default api;