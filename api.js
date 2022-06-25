const axios = require('axios').default;
axios.defaults.baseURL = 'https://the-one-api.dev/v2';

function API(token){
  defaultOpts = token? {'Authorization': `Bearer ${token}`} : {};
  let api = {
    get: (resource, opts={}) => {
      return axios.get(resource, {...defaultOpts, ...opts})
                  .then(res => {
                    // console.log(res.request._header)
                    return res.data
                  })
                  .catch(err => handleError(err))
    }
    // TODO : throw errors on 40x and 50x responses
    // repeat for other methods if required; other option is to use a Proxy to wrap Axios
  }
  return api;
}

function handleError(err){
  console.log("Error", e);
  throw e;
}

module.exports = {
  API
}