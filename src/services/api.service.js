import axios from 'axios'
import {TokenService} from '../services/storage.service'
import store from '../store'

const ApiService = {

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    store.dispatch('handleError' , {errorMsg: error.response.data})
                });
        });
    },

    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.put(url , data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    store.dispatch('handleError' , {errorMsg: error.response.data})
                });
        });
    },
    put(url , data) {
        return new Promise((resolve, reject) => {
            axios.put(url , data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    store.dispatch('handleError' , {errorMsg: error.response.data})
                });
        });
    },
    delete(resource) {
        return axios.delete(resource)
    },

    _401interceptor: null,

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.request.status == 401) {
                    if (error.config.url.includes('/o/token/')) {
                        // Refresh token has failed. Logout the user
                        store.dispatch('auth/logout')
                        throw error
                    } else {
                        // Refresh the access token
                        try {
                            await store.dispatch('auth/refreshToken')
                            // Retry the original request
                            return this.customRequest({
                                method: error.config.method,
                                url: error.config.url,
                                data: error.config.data
                            })
                        } catch (e) {
                            // Refresh has failed - reject the original request
                            throw error
                        }
                    }
                }

                // If error was not 401 just reject as is
                throw error
            }
        )
    },

    unmount401Interceptor() {
        // Eject the interceptor
        axios.interceptors.response.eject(this._401interceptor)
    },
    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
     **/
    customRequest(data) {
        return axios(data)
    }
}

export default ApiService