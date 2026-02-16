import { useEffect, useState } from "react"
import { Social } from "../../componentes/social"

import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa"
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { banco } from "../../services/fireaBaseConnection"


interface LinksProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

interface socialLinkProps {
    facebook: string,
    instagram: string,
    youtube: string
}

export function Home(){

    const [link, setLink] = useState<LinksProps[]>([])
    const [social, setSocial] = useState<socialLinkProps>()


    
    useEffect(() => {
        function carregarLink(){
            const ref = collection(banco, "Links")
            const ordenado = query(ref, orderBy("created", "asc"))

            getDocs(ordenado)
            .then((snapshot) => {
                const lista = [] as LinksProps[]

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name : doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })

                setLink(lista)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        carregarLink()
    },)


    useEffect(() => {
        function carregarSocial(){
            const ref = doc(banco, "social", "link")

            getDoc(ref)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setSocial({
                        facebook: snapshot.data()?.facebook,
                        youtube: snapshot.data()?.youtube,
                        instagram: snapshot.data()?.instagram,
                    })
                }
            })

        }

        carregarSocial()
    },)


    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">pagina Home</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {link && link.map((link) => (
                    <section key={link.id} className=" mb-4 w-full  items-center py-2 rounded-lg select-none transition-transform hover:scale-105"
                    style={{backgroundColor: link.bg, color: link.color}}
                    >
                    <a href={link.url} target="_blank">
                        <p >
                            {link.name}
                        </p>
                    </a>
                </section>
                ))}
            </main>

            {social && Object.keys(social).length > 0 && (
                <footer className="flex justify-center gap-3 my-4">
                    <Social url={social?.facebook}>
                        <FaFacebook size={35} color="#FFF"/>
                    </Social>

                    <Social url={social?.youtube}>
                        <FaYoutube size={35} color="#FFF"/>
                    </Social>

                    <Social url={social?.instagram}>
                        <FaInstagram size={35} color="#FFF"/>
                    </Social>
            </footer>
            )}
        </div>
    )
}