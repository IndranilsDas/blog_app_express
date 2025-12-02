'use client';
import { json } from "node:stream/consumers";
import { createContext,ReactNode,useContext, useEffect,useState } from "react";
interface User{
    id:number;
    username:string;
}

interface AuthType{
    user:User | null;
    isLogged:boolean;
    setIsLogged:(value:boolean)=>void;
    token:string
    login:(token:string,user:User)=> void;
    logout:() => void;

}

const AuthContext = createContext<AuthType | undefined>(undefined)

const Authprovider = ({children}:{ children: ReactNode }) =>{
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState("")
    const login = async(token:string,user:User)=>{
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        console.log(JSON.stringify(user),"Stringify\n",localStorage.getItem('user'));
        console.log(user);
        
    }
    const logout = async() =>{}
    useEffect(()=>{
        let storedToken = localStorage.getItem('token')
        let storedUser = localStorage.getItem('user')

        if (storedToken && storedUser){
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
        }

    },[])

    return (<AuthContext.Provider 
    value={{user,token ,isLogged,setIsLogged,login,logout}}>
        
        {children}

    </AuthContext.Provider>)
}

export default Authprovider

export const useAuth = () => useContext(AuthContext)