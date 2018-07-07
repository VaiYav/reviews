import axios from 'axios'

export default {
  fetchCustomer: (payload = {}) => {
    return axios
      .get(`/customer`, {
        params: payload
      })
      .then(payload => payload)
      .catch(payload => console.error(payload))
  }
}
