import axios from 'axios';

const api = axios.create({
    baseURL:'http://192.168.1.4:3333/',
    
    //exp://10.101.0.189:19000
});

export default api;