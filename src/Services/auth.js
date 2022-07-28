import axios from 'axios';

const API_LOGIN_URL = "http://adityanjothir.pythonanywhere.com/api/token/";
const API_REFRESH_URL = "http://adityanjothir.pythonanywhere.com/api/token/refresh";

export const login = async (user, pass) => {
    let success = 0;
    await axios.post(API_LOGIN_URL, {
        username: user,
        password: pass
    }).then(async response => {
        if (response.data.access) {
            await localStorage.setItem("access", response.data.access);
            await localStorage.setItem("refresh", response.data.refresh);
            console.log("Login Successful");
            success = 1;
        }
    }).catch(error => {
        console.log(error);
        success = 0;
    })
    return success;
};

export const getAuth = async () => {
    const access = await localStorage.getItem("access");
    const refresh = await localStorage.getItem("refresh");
    return access;
};

export const getAccess = async () => {
    const {acc,ref} = getAuth();

    await axios.post(API_REFRESH_URL,{
        refresh:ref,
    }).then(async response => {
        if(response.data.access){
            await localStorage.setItem("access",response.data.access);
        }
    }).catch(error => {
        console.log(error);
        return 0;
    })
   
}