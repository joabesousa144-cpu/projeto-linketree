import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../componentes/Header"
import { Input } from "../../componentes/input"
import { FiTrash } from "react-icons/fi"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore"
import { banco } from "../../services/fireaBaseConnection"



interface LinksProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

export function Admin(){
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColor, setTextColor] = useState("#f1f1f1")
    const [backgroundColor, setBackgroundColor] = useState("#121212")
    const [links, setLinks] = useState<LinksProps[]>([])


    useEffect(() =>{
        const linksCollection = collection(banco, "Links")
        const ordenados = query(linksCollection, orderBy("created", "asc"))

        const unsub = onSnapshot(ordenados, (onsnapshot) => {
            const lista = [] as LinksProps[]
            onsnapshot.forEach((item) => {
              lista.push({
                id: item.id,
                name: item.data().name,
                url: item.data().url,
                bg: item.data().bg,
                color: item.data().color
              })
            })
            setLinks(lista)
        }) 
        return () => {
            unsub()
        }
    },[])




    function cadastrar(e: FormEvent){
        e.preventDefault()

        if(nameInput === "" || urlInput === ""){
            alert("Preencha o campo!!")
            return
        }


        addDoc(collection(banco, "Links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColor,
            color: textColor,
            created: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")
            alert("Cadastrado com sucesso!!")
        })
        .catch((error) => {
            console.log("Ocorreu algum erro: " + error)
        })
    }

    async function deletar(id: string){
        const ref = doc(banco, "Links", id)

        await deleteDoc(ref)
    }
    return(
        <div className="flex flex-col items-center">
            <Header/>

            <form onSubmit={cadastrar} className="flex flex-col my-15 w-full max-w-xl gap-4">
                <label className="text-amber-50">Nome do Link: </label>
                <Input
                placeholder="Digite o nome do Link..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                />
                <label className="text-amber-50">Url do Link: </label>
                <Input
                placeholder="Digite a url..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                />
                <section className="flex  w-full max-w-xl my-4 gap-5">
                <div>
                    <label className="text-amber-50">Cor  do Link: </label>
                    <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-amber-50">Fundo do Link: </label>
                    <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    />
                </div>

            </section>

             {nameInput !== "" && (
                    <div className="w-full max-w-xl flex  flex-col  items-center justify-start border-gray-100/25 border rounded-md">
                    <label className="text-white mt-3 mb-3">Veja como fica 👇🏻</label>
                    
                    <article className="min-w-11/12 p-11 text-center mb-10 rounded-md" style={{backgroundColor: backgroundColor}}>
                        <p className="font-medium" style={{color: textColor} }>{nameInput}</p>
                    </article>
                </div>
                )}

                <button type="submit" className="bg-blue-600 h-10 rounded font-bold cursor-pointer">
                    Cadastrar
                </button>
            </form>

            <h2 className="text-amber-50 font-bold text-3xl mb-7">Meus Links</h2>


            {links.length !== 0 && links.map((item) => (
                <article key={item.id} className="flex w-11/12 max-w-xl items-center justify-between  p-3 rounded mb-4" 
                style={{backgroundColor: item.bg, color: item.color}}
                >
                <p>{item.name}</p>

                <div>
                    <button onClick={() => deletar(item.id)} className="border border-dashed bg-black p-1 cursor-pointer">
                        <FiTrash size={18} color="white"/>
                    </button>
                </div>
            </article>
            ))}

            
           
        </div>
    )
}