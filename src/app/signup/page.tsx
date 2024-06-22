'use client'
const SignUp = () => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }
    return (
        <div className="flex basis-full h-full flex-grow justify-center items-center ">
            <section className="shadow-xl shadow-green-300/50 m-5">
                <form className="glassmorphism max-sm:flex max-sm:flex-col" onSubmit={handleSubmit}>
                    <div className="flex justify-around gap-20 max-sm:block">
                        <div>
                            <label>
                                <span className="form_label">
                                    First Name
                                </span>
                                <input className="form_input mb-2" type='text'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Last Name
                                </span>
                                <input className="form_input mb-2" type='text'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Email
                                </span>
                                <input className="form_input mb-2" type='email'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Location
                                </span>
                                <textarea rows={5} className="form_input mb-2">
                                </textarea>
                            </label>
                            <label>
                                <span className="form_label">
                                    Mobile Number
                                </span>
                                <input className="form_input mb-2" type='number'>
                                </input>
                            </label>
                        </div>
                        <div>
                            <label>
                                <span className="form_label">
                                    Date of Birth
                                </span>
                                <input className="form_input mb-2" type='date'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Secondary email
                                </span>
                                <input className="form_input mb-2" type='email'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Username
                                </span>
                                <input className="form_input mb-2" type='text'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Password
                                </span>
                                <input className="form_input mb-2" type='password'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Confirm Password
                                </span>
                                <input className="form_input mb-2" type='password'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Role
                                </span>
                                <select className="form_input mb-2">
                                    <option value={1}>User</option>
                                    <option value={2}>Admin</option>
                                </select>
                            </label>
                            {/* <!-- Component Start --> */}
                            {/* <div className="relative">
                                <button className="flex items-center h-8 pl-3 pr-2 border border-black focus:outline-none">
                                    <span className="text-sm leading-none">
                                        Dropdown
                                    </span>
                                    <svg className="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <div className="absolute flex flex-col w-40 mt-1 border border-black shadow-lg">
                                    <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#">Item 1</a>
                                    <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#">Item 2</a>
                                    <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#">Item 3</a>
                                    <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#">Item 4</a>
                                </div>
                            </div> */}
                            {/* <!-- Component End  --> */}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="signUp_button">SignUp</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
export default SignUp;