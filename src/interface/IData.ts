
export interface IValidation{
    name: string,
    phone: string,
    email: string,
    password: string,
  }
  
  export interface ILoginFrom{
    email: string,
    password: string,
  }
  export interface IAuth{
    id:string,
    name: string,
    phone: string,
    email: string,
  }
  export interface IMessage {
    senderId: string;
    receiverId:string;
    content: string;
    timestamp:string;
  }
  