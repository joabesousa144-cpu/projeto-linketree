import { BiLogOut } from "react-icons/bi"
import {auth} from "../../services/fireaBaseConnection"
import { Link } from "react-router"
import { signOut } from "firebase/auth"

export function Header(){

    async function logOut(){
        await signOut(auth)
    }
    return(
        <header className="w-full max-w-2xl h-10 bg-gray-300 mt-10 rounded-md">
            <nav className="flex h-9 justify-between items-center px-2">
                <div className="flex gap-7">
                    <Link to={"/"}>
                    Home
                    </Link>
                    <Link to={"/admin"}>
                    Links
                    </Link>
                    <Link to={"/admin/social"}>
                    Redes Sociais
                    </Link>
                </div>

                <button className="cursor-pointer" onClick={logOut}>
                    <BiLogOut size={28} color="#db2629"/>
                </button>
            </nav>
        </header>
    )
}