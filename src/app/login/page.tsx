'use client';

import Link from "next/link";
import background from '../../../public/images/solarsystem1.jpg';

const Login = () => {
    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }
    return (
        <div className="flex basis-full h-full w-full justify-center items-center">
            <section className="shadow-xl shadow-black/70" >
                <form className="glassmorphism flex flex-col  " onSubmit={(e) => HandleSubmit(e)}>
                    <label>
                        <span className="form_label">
                            Username:
                        </span>
                        <input className="form_input" type='text'>
                        </input>
                    </label>
                    <label className="mt-2">
                        <span className="form_label">
                            Password:
                        </span>
                        <input className="form_input" type='password'>
                        </input>
                    </label>
                    <div className="mt-5 flex justify-center">
                        <button className="login_button" type='submit'>
                            Login
                        </button>
                    </div>

                    <div>
                        <label className="flex text-[0.6rem] md:text-[0.8rem] mt-5 text-gray-900 font-mono">New here?<Link className="text-cyan-600 ml-0.5" href="/signup">signup</Link></label>
                    </div>
                </form>
            </section>
        </div>
    )
}
export default Login;