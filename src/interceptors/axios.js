import axios from "axios";
import store from '@/store'
axios.defaults.baseURL = 'http://127.0.0.1:8000';

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        const {status, data} = await axios.post('auth/refresh', store.state.refreshToken, 
        );

        if (status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
            store.dispatch('setRefreshToken', data.refresh_token)
            //return axios(error.config);
        }
    }
    refresh = false;
    return error;
});