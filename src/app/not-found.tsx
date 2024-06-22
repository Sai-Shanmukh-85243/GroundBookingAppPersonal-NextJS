import Image from "next/image";

const NotFound = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <Image src='/images/luffy1.png' alt="page not found" width={400} height={400} />
            <div>
                <hr className="border-2 border-red-600"/>
                <div className="text-xl font-serif font-semibold"> 404 Page not found </div>
                <hr className="border-2 border-red-600"/>
            </div>
        </div>
    )
}

export default NotFound;