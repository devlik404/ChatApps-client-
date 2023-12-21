import { useState, ChangeEvent, FormEvent} from "react";
import { ApiData } from "../hooks/Api";
import { IValidation } from "../interface/IData";
import { useNavigate } from "react-router-dom";



export function useRegister (){
      //validation register
  const [Validate,setValidate] = useState<IValidation>({
    name:"",
    phone:"",
    email:"",
    password:""
})
console.log("data validate",Validate)
// const toast = useToast();
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
         await ApiData.post("/register",Validate)
          navigate("/login")
      } catch (error) {
          console.log("error submit data",error)
      }
  }
 return{changeHandlerValidate,submitHandelValidate}
}