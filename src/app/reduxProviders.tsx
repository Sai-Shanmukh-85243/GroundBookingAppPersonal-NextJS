'use client'
import { store } from "@/redux/store"
import { ReactNode } from "react"
import { Provider } from "react-redux"

interface Props{
    children?: ReactNode
}

export const Providers = ({children}:Props) =>{
    return(
        <Provider store = {store}>
            {children}
        </Provider>
    )
}