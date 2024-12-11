import axios from 'axios'
import React ,{useState,createContext, useContext, useEffect} from 'react'


const userContext = createContext()
const authContext = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const verifyUser = async () =>{
            try {
                const token = localStorage.getItem('token')
                if(token){
                    const response = await axios.get("http://https://5000-idx-hrdynamics-1733934878574.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev//api/auth/verify",{
                        headers:{
                           Authorization :  `Bearer ${token}`
                        }
                    })
                    // console.log(response);  // for debuggin
                    
                    if (response.data.success) {
                        setUser(response.data.user)
                    }
                }else{
                   setUser(null)
                   setLoading(false)
                }
            } catch (error) {
                console.log(error);
                
                if(error.response && !error.response.data.error ){
                    setUser(null)
                }
            }finally{
                setLoading(false)
            }
        }
        verifyUser()
    },[])

    const login =(user)=>{
        setUser(user)
    }
    const logout =()=>{
        setUser(null)
        localStorage.removeItem("token")
    }
  return (
    <userContext.Provider value={{login,logout,user,loading}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext)
export default authContext