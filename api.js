const axios = require('axios').default;
axios.defaults.baseURL = 'https://the-one-api.dev/v2';

function API(token){
  defaultOpts = token? {headers:{'Authorization': `Bearer ${token}`}} : {};
  let api = {
    get: (resource, opts={}) => {
      return axios.get(resource, {...defaultOpts, ...opts})
                  .then(res => {
                    console.log(res.request._header)
                    return res.data
                  })
                  .catch(err => handleError(err))
    }
    // repeat for other methods if required; other option is to use a Proxy to wrap Axios
  }
  return api;
}

function handleError(err){
  console.log("Error", err);
  throw err;
}

function processSort(sObj){
  if (Object.keys(sObj).length === 0) return {}
  return {sort: Object.entries(sObj)[0].join(":")}
}

function processFilter(filter){
  let nop = {}
  for(let prop in filter){
    switch (prop) {
      case 'match':
        nop = {...nop, ...filter['match']}
      break;

      case 'reject':
        for(let k in filter[prop])
          nop[`${k}!`] = filter[prop][k];
      break;

      case 'includes':
        for(let k in filter[prop]){
          nop[k] = filter[prop][k].toString();
        }
      break;

      case 'excludes':
        for(let k in filter[prop]){
          nop[`${k}!`] = filter[prop][k].toString();
        }
      break;

      case 'lt':
        for(let k in filter[prop]){
          nop[`${k}<${filter[prop][k]}`] = '';
        }
      break;

      case 'gt':
        for(let k in filter[prop]){
          nop[`${k}>${filter[prop][k]}`] = '';
        }
      break;

      case 'eq':
        nop = {...nop, ...filter['eq']}
      break;

      case 'like':
        for(let k in filter[prop]){
          nop[k] = `/${filter[prop][k]}/i`;
        }
      break;
    
      default:
        break;
    }
  }
  return nop;
}


module.exports = {
  API,
  processSort,
  processFilter
}