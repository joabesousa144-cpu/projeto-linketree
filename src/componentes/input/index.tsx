import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){
    return(
        <input 
        className="bg-amber-50 h-9 rounded-md px-3 outline-none text-1 mb-3"
        {...props}
         />
    )
}