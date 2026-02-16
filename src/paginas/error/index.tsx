import { Link } from "react-router";



export function ErrorPage(){
    return(
        <div className="flex flex-col w-full min-h-screen items-center justify-center text-amber-50">
            <h1 className="text-6xl">404</h1>
            <h1 className="text-4xl my-5">Pagina não encontrada!</h1>

            <Link to={"/"} className="italic bg-blue-800 p-2 rounded">
            Voltar para Home
            </Link>
        </div>
    )
}