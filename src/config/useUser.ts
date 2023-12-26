import { useEffect, useState } from "react";
import { ApiData, setAuthToken } from "../hooks/Api";
import { IAuth } from "../interface/IData";

export function UseUsers() {
    const [auth,setAuth] =  useState<IAuth[]>([]);
    const [user, setUser] = useState<IAuth>({
        id: "",
        name: "",
        email: "",
        phone: "",
      });
    
    const fetchData = async () => {
        try {
            const response = await ApiData.get("/user",{
                headers: {Authorization: ` Bearer ${localStorage.token}`},
            })
            setAuth(response.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const fetchUser = async () => {
        try {
          setAuthToken(localStorage.token);
          const response = await ApiData.get("/check");
          setUser(response.data.user);
        } catch (error) {
          console.info(error);
        }
      };
    
    useEffect(()=>{
        fetchData();
        fetchUser();
    },[])
 
  return{auth,user,fetchUser}
}
