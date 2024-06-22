import Image from "next/image";

const MyBookings = () =>{
    return(
        <div className="flex h-full w-full">
            <div className="-z-10 opacity-10">
                <Image src='/images/hockey1.png' alt='hockey' layout="fill"/>
            </div>
        </div>
    )
}

export default MyBookings;