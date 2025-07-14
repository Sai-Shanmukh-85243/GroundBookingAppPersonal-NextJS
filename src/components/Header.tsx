'use client';
import Image from "next/image";
import Nav from "./Nav";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    useEffect(()=>{
        router.prefetch('/403');
    },[])
    return (
        <div className="flex flex-shrink-0">
            <div className="flex px-10 items-center py-2 bg-yellow-200 w-full">
                
            <div className="flex-shrink">
                    <Link href={'/'} className="flex gap-1">
                        <Image className="hidden sm:flex rounded-full" src={'/images/logo.ico'} alt='logo' width={50} height={40} />
                        <div className="flex flex-col justify-center">
                            <span className="logo_text">Booking Application </span>
                        </div>
                    </Link>
                </div>
                <div className="flex-grow lg:mx-20">
                    <Nav />
                </div>
              
            </div>
            {/* } */}
        </div>

    )
}
export default Header;