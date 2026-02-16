import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, useEffect, useState } from "react"
import {auth} from "../services/fireaBaseConnection"
import { Navigate } from "react-router"

interface PrivateProps{
    children: ReactNode
}

export function Private({children}:PrivateProps){

    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@Linketree", JSON.stringify(userData))
                setLoading(false)
                setSigned(true)
            }else{
                console.log("Não tem user logado!")
                setLoading(false)
                setSigned(false)
            }
        })

        return () => {
            unsub()
        }
    },[])

    if(loading){
        return <div></div>
    }

    if(!signed){
        return <Navigate to={"/login"}/>
    }

    return children
}
