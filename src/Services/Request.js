import axios from 'axios';
import toast from 'react-hot-toast';

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

export const delReq = async (url) =>{
  let token = await localStorage.getItem("access");
  await axios.delete(url,{
    headers: {
    Authorization: 'Bearer ' + token 
    }   
}).then(response=>toast.success("Item Deleted"))
.catch(error=>toast.error("Cannot Delete")) 
}