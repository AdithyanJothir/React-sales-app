import axios from 'axios';

export const getReq = async (url) => {
    let token = await localStorage.getItem("access");
    let rows = [];
    await axios.get(url, {headers: {
        Authorization: 'Bearer ' + token 
      }}).then(response => {
        console.log(response.data);
        rows = response.data;
      })
      .catch(error => console.log(error))
      return rows;
}

export const postReq = async (url,payload) => {
  let token = await localStorage.getItem("access");
  await axios.post(url,{
    headers: {
    Authorization: 'Bearer ' + token 
    },
    data:payload
    
})
}