import { Link, useNavigate } from "react-router";
import { Input } from "../../componentes/input";
import { FormEvent, useState } from "react";

import {auth} from "../../services/fireaBaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function cadastro(e: FormEvent){
        e.preventDefault()

       if(email === "" || password === ""){
            console.log("preencha os campos!!")
            return
       }

       signInWithEmailAndPassword(auth, email, password)
       .then(() => {
        console.log("Logado com sucesso!!")
        navigate("/admin", {replace: true})
       })
       .catch((error) =>{
        console.log("Algo deu errado: ")
        console.log(error)
       })
    }

    return(
        <div className="flex flex-col w-full h-screen items-center justify-center"> 
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
                    Dev
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>

            <form className="w-full max-w-96 flex flex-col" onSubmit={cadastro}>
                <Input
                type="email"
                placeholder="Digite seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                type="password"
                placeholder="Digite sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="bg-blue-500 rounded-md h-9 cursor-pointer">
                    Acessar
                </button>
            </form>
        </div>
    )
}