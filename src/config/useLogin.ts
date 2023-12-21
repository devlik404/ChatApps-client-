import { useState, ChangeEvent, FormEvent} from "react";
import { ApiData} from "../hooks/Api";
import { useNavigate } from "react-router-dom";
import { ILoginFrom } from "../interface/IData";

import { setAuthToken } from "../hooks/Api";

export function useLogin (){
 
  const [Validate,setValidate] = useState<ILoginFrom>({
    email:"",
    password:""
})

    const  changeHandlerValidate = (event:ChangeEvent<HTMLInputElement>)=>{
      const { name, value } = event.target;
      setValidate({
            ...Validate,
            [name]:value
        })
    
    }
    const navigate = useNavigate()

    const submitHandelValidate = async (e:FormEvent) =>{
      e.preventDefault()
      try {
         const response = await ApiData.post("/login",Validate)
   
        localStorage.setItem("token",response.data.token)
        setAuthToken(localStorage.token)
          navigate("/")
      
      } catch (error) {
          console.log("error submit data",error)
      }
  }
 
 return{changeHandlerValidate,submitHandelValidate}
}