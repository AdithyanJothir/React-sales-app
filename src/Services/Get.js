import axios from 'axios';

export const GetReq = async (url) => {
    let token = localStorage.getItem("access");
    await axios.get(url, {headers: {
        Authorization: 'Bearer ' + token 
      }}).then(response => console.log(response)
      ).catch(error => console.log(error))
}