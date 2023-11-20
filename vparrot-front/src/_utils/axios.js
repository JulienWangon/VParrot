import axios from 'axios';

const instanceAxios = axios.create( {
    baseURL: 'http://localhost/vparrot/',
    withCredentials: true
});


export default instanceAxios;