import axios from 'axios';
import toast from 'react-hot-toast';

export const getReq = async (url) => {
    let token = await localStorage.getItem("access");
    let rows = [];
    await axios.get(url, {headers: {
        Authorization: 'Bearer ' + token 
      }}).then(response => {
        rows = response.data;
      })
      .catch(error => console.log(error))
      return rows;
}

export const postReq = async (url,payload) => {
  let token = await localStorage.getItem("access");
  let response = 0;
  await axios.post(url,payload,{
    headers: {
    Authorization: 'Bearer ' + token 
    },   
}).then(res=> {
  response=res;
  toast.success("Item Added");
})
.catch(error => {toast.error("Cannot Add");})


return response.status;
}


export const putReq = async (url,payload) => {
  let token = await localStorage.getItem("access");
  
  const config = {
    headers: {
    Authorization: 'Bearer ' + token 
    },
    };

    let response = 0;
   
    await axios.put(
    url,
    payload,
    config
    ).then(res => {
      toast.success("Item saved");
      response = res;
    })
    .catch(error=>{
      toast.error("Couldn't save item. Please try again")
    })
    return response.status;
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
