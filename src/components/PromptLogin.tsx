import Link from "next/link";

const PromptLogin = ({messagePrefix}:{messagePrefix:string}) => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <span className="font-serif font-thin">Please <Link className="hover:underline text-blue-600 hover:text-blue-300" href={'/login'}>Login</Link> To {messagePrefix}</span>
        </div>
    )
}

export default PromptLogin;