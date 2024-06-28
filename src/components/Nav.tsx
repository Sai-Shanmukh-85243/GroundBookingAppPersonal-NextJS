'use client';
import { popupModel } from "@/models/popupModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { LoginSelector, removeLoginData } from "@/redux/slices/loginSlice";
import { setPopup } from "@/redux/slices/popupSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {

    const [showMenuItems, setShowMenuItems] = useState(false);
    const isLoggedIn = useAppSelector(LoginSelector);
    const activePath = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const loginData = useAppSelector(LoginSelector);

    useEffect(() => {
        if (loginData.status) {
            router.push("/");
        }
    }, [loginData]);

    const navLinks = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'About', path: '/about' },
        { id: 3, name: 'Support', path: '/support' },
        { id: 4, name: 'Grounds', path: '/grounds' },
        { id: 5, name: 'My Booking', path: '/mybookings' },
    ]

    const isActive = (path: string) => {
        return path === activePath;
    }

    function HandleLogout() {
        dispatch(removeLoginData());
        let popup:popupModel ={
            show:true,
            message:'Logged Out Successfully',
            type:'success'
        }
        dispatch(setPopup(popup))
        router.push('/login');
    }

    return (
        <div>
            <nav className="hidden md:flex md:justify-between items-center gap-4">
                <div className="flex gap-4 ">
                    {navLinks.map((ele) => {
                        return (
                            <Link href={ele.path} key={ele.id}><span className={`nav_text whitespace-nowrap  ${isActive(ele.path) ? ' active_path_nav_text' : ''}`}>{ele.name}</span></Link>
                        )
                    })}
                </div>
                {
                    isLoggedIn.status
                        ?
                        <div className="flex gap-4">
                            <button onClick={HandleLogout} className="nav_text">Logout</button>
                            <span className="nav_text zoom_text">{isLoggedIn.username ? isLoggedIn.username : 'NA'}</span>
                            <span className="nav_text zoom_text">{isLoggedIn.role ? isLoggedIn.role.slice(1, -1) : 'NA'}</span>
                        </div>
                        :
                        <div className="flex gap-4">
                            <Link href='/login'><span className={`nav_text ${isActive('/login') ? 'active_path_nav_text' : ''}`}>Login</span></Link>
                            <Link href='/signup'><span className={`nav_text ${isActive('/signup') ? 'active_path_nav_text' : ''}`}>SignUp</span></Link>
                        </div>
                }
            </nav>

            {/* for devices smaller than xl */}
            <nav>
                <div className="flex md:hidden flex-row-reverse">
                    <Image onClick={() => { setShowMenuItems((prevState) => { return !prevState }) }} className="hover:cursor-pointer" src={'/icons/menu.svg'} alt='menu' width={30} height={30} />
                </div>
                {
                    showMenuItems
                    &&
                    <div className="flex md:hidden w-auto flex-col gap-4  items-center text-center p-3 bg-slate-100 fixed right-0 rounded-md z-50">
                        <div className="flex flex-col gap-4 ">
                            {navLinks.map((ele) => {
                                return (
                                    <Link onClick={() => { setShowMenuItems(false) }} href={ele.path} key={ele.id}><span className={`nav_text whitespace-nowrap  ${isActive(ele.path) ? ' active_path_nav_text' : ''}`}>{ele.name}</span></Link>
                                )
                            })}
                        </div>
                        {
                            isLoggedIn.status
                                ?
                                <div className="flex flex-col gap-4">
                                    <button onClick={() => { setShowMenuItems(false); HandleLogout() }} className="nav_text">Logout</button>
                                    <span onClick={() => { setShowMenuItems(false) }} className="nav_text zoom_text">{isLoggedIn.username ? isLoggedIn.username : 'NA'}</span>
                                    <span onClick={() => { setShowMenuItems(false) }} className="nav_text zoom_text">{isLoggedIn.role ? isLoggedIn.role.slice(1,-1) : 'NA'}</span>
                                </div>
                                :
                                <div className="flex flex-col gap-4">
                                    <Link onClick={() => { setShowMenuItems(false) }} href='/login'><span className={`nav_text ${isActive('/login') ? 'active_path_nav_text' : ''}`}>Login</span></Link>
                                    <Link onClick={() => { setShowMenuItems(false) }} href='/signup'><span className={`nav_text ${isActive('/signup') ? 'active_path_nav_text' : ''}`}>SignUp</span></Link>
                                </div>
                        }
                    </div>
                }
            </nav>
        </div>
    )
}

export default Nav;