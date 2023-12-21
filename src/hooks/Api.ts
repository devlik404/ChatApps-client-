import axios from "axios"

export const ApiData = axios.create({
    baseURL:"http://localhost:3000/"
    
})
export function setAuthToken(token:string){
if (token){
    ApiData.defaults.headers.common["Authorization"] = `Bearer ${token}`;

}else{
    delete ApiData.defaults.headers.common["Authorization"];
}
}