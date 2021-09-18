const axios = require('axios').default;

export const apiResponse = async (url, data) => {
      const headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      };
      return await axios.post(url, data, {headers})
}