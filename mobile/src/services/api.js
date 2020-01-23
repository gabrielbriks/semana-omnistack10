import axios from 'axios';

const api = axios.create({
    baseURL:'exp://ax-wzj.anonymous.mobile.exp.direct:3333',
    //exp://10.101.0.189:19000
});

export default api