import { useEffect, useState } from "react";
import { ApiData } from "../hooks/Api";
import { IAuth } from "../interface/IData";

export function UseUsers() {
    const [auth,setAuth] =  useState<IAuth[]>([]);
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
    useEffect(()=>{
        fetchData()
    },[])
 
  return{auth}
}
