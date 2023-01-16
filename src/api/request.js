import axios from 'axios'

axios.interceptors.response.use((response) => {
  if (!response) return {}
  return response
}, (error) => {
  if (error.response.status > 400) {
    alert(error?.response?.data?.message || 'Unknown error, please retry later')
    return Promise.reject(error)
  }
  return Promise.reject(error)
})

export default function request ({ method, url, data, params, headers = {}, responseType = 'json' }) {
  return axios({
    method,
    url,
    data,
    headers,
    params,
    responseType
  }).then(response => response.data)
}
