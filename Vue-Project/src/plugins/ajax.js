import axios from 'axios'
import qs from 'qs'

// const API_PREFIX = `http://localhost:8084`
// axios.defaults.withCredentials = true

export default {
  install (Vue) {
    Vue.prototype.$post = function (url, data) {
      return axios({
        method: 'post',
        // url: API_PREFIX + '/' + url,
        url: url,
        data: qs.stringify(data)
        // data: data
      })
    }
    Vue.prototype.$get = function (url, params) {
      return axios.get(API_PREFIX + '/' + url, {
        params: params
      })
    }
    Vue.prototype.$http = axios

    Vue.http = axios
  }
}
