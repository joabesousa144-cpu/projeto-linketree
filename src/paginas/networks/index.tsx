import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../componentes/Header";
import { Input } from "../../componentes/input";
import { doc,getDoc,setDoc } from "firebase/firestore";
import { banco } from "../../services/fireaBaseConnection";


export function Network(){

    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")


    useEffect(()=>{
        function load(){
            const ref = doc(banco, "social", "link")

            getDoc(ref) 
            .then((snapshot)=>{
               if(snapshot.data() !== undefined){
                 setYoutube(snapshot.data()?.youtube)
                setFacebook(snapshot.data()?.facebook)
                setInstagram(snapshot.data()?.instagram)
               }
            })
            .catch((error)=>{
                console.log(error)
            })
        }

        load()
    }, [])


    function cadastrar(e: FormEvent){
        e.preventDefault()

        setDoc(doc(banco, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        })
        .then(() => {
            console.log("Cadastrado com sucesso!!")
        })
        .catch((error) => {
            console.log("Ocorreu algum erro: " + error)
        })
    }

    return(
        <div className="flex flex-col items-center  min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="font-bold text-2xl text-white my-8">Minhas redes sociais</h1>


            <form className="flex flex-col w-full max-w-xl" onSubmit={cadastrar}>
                <label className="text-amber-50 mb-4">Link do Facebook: </label>
                <Input
                type="url"
                placeholder="Digite a url do facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                />
                <label className="text-amber-50 mb-4">Link do Instagram: </label>
                <Input
                type="url"
                placeholder="Digite a url do instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                />
                <label className="text-amber-50 mb-4">Link do youtube: </label>
                <Input
                type="url"
                placeholder="Digite a url do youtube"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                />

                <button className="bg-blue-600 h-9 rounded font-medium text-amber-50 cursor-pointer" type="submit">
                    Salvar links
                </button>
            </form>
        </div>
    )
}