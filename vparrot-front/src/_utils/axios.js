import axios from 'axios';

const instanceAxios = axios.create( {
    baseURL: 'http://localhost/vparrot/'
});


export default instanceAxios;