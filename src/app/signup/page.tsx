'use client'

import { signupInputModel } from "@/models/signupInputModel";
import { useAppDispatch } from "@/redux/hook";
import { setPopup } from "@/redux/slices/popupSlice";
import { addSignUp } from "@/redux/slices/signupSlice";
import { useState } from "react";

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [location, setLocation] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [secondaryEmail, setSecondaryEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [role, setRole] = useState("User");

    const [passwordError, setPasswordError] = useState(false);
    const [dateError, setDateError] = useState(false);

    const dispatch = useAppDispatch();

    const handleDateChange = (date: string) => {
        //alert(date)
        var date1 = new Date(date);
        //alert(date1)
        let givenDate = date1.toISOString().split("T")[0];
        let dateObj = new Date();
        let currentdate = dateObj.toISOString();
        if (currentdate.split("T")[0] < givenDate) {
            dispatch(setPopup({message:'Please select valid DOB' , show:true,type:'danger'}))
            setDateError(true);
            setDateOfBirth("");
        }
        else {
            setDateOfBirth(date1.toISOString().split("T")[0]);
            setDateError(false)
        }
    };

    function checkPassword() {
        const passwordCaptialLetterRegex = new RegExp("^.*[A-Z]+.*$");
        const passwordSmallLetterRegex = new RegExp("^.*[a-z]+.*$");
        const passwordNumberRegex = new RegExp("^.*[0-9]+.*$");
        const passwordSpecialCharacterRegex = new RegExp("^.*[^A-Za-z0-9]+.*$");
        if (!passwordCaptialLetterRegex.test(password) ||
            !passwordSmallLetterRegex.test(password) ||
            !passwordNumberRegex.test(password) ||
            !passwordSpecialCharacterRegex.test(password)) {
            dispatch(setPopup({ message: "Password Must contain atleast 1 uppercase,1 lowercase,1 number and 1 special character", type: 'danger', show: true }))
            setPasswordError(true);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const mobileNumberRegex = new RegExp("^[0-9]{10}$");
        const userNameRegex = new RegExp(/^\w{3,}$/);
        const emailRegex = /^\w+@\w+\.\w+$/;
        if (firstName === "" ||
            lastName === "" ||
            email === "" ||
            location === "" ||
            mobileNumber === "" ||
            dateOfBirth === "Select Date" ||
            username === "" ||
            password === "" ||
            confirmPassword === "" ||
            role === "") {
            dispatch(setPopup({ message: "Please fill all the mandatory field", type: 'danger', show: true }))
        }
        else if (dateError) {
            dispatch(setPopup({ message: "Plese select a valid date", show: true, type: "danger" }))
        }
        else if (password !== confirmPassword) {
            dispatch(setPopup({ message: "Password and Confirm Password donot match", type: 'danger', show: true }))
        }
        else if (!mobileNumberRegex.test(mobileNumber)) {
            dispatch(setPopup({ message: "Mobile number can only contain numbers and must have 10 digits", type: 'danger', show: true }))
        }
        else if (!emailRegex.test(email)) {
            dispatch(setPopup({ message: "Email format is invalid", type: 'danger', show: true }))
        }
        else if (((secondaryEmail) && !emailRegex.test(secondaryEmail))) {
            dispatch(setPopup({ message: "Secondary Email format is invalid", type: 'danger', show: true }))
        }
        else if (!userNameRegex.test(username)) {
            dispatch(setPopup({ message: "Username must have atleast 3 character and cannot contain special characters", type: 'danger', show: true }))
        }
        else if (passwordError) {
            dispatch(setPopup({ message: "Password format is invalid,Password Must contain atleast 1 uppercase,1 lowercase,1 number and 1 special character", type: 'danger', show: true }))
        }
        else {
            const signUpDetails: signupInputModel = {
                firstname: firstName,
                lastname: lastName,
                email: email,
                user_location: location,
                mobile_number: mobileNumber,
                date_of_birth: dateOfBirth,
                created_by: username,
                modified_by: username,
                secondary_emailid: secondaryEmail,
                userCredentials: {
                    username: username,
                    password: password,
                    role: {
                        roleName: role
                    }
                }
            }
            //console.log("in signup func")
            dispatch(addSignUp(signUpDetails));
            //props.navigation.navigate('Login');
            setFirstName('');
            setLastName('');
            setEmail('');
            setLocation('');
            setMobileNumber('');
            setDateOfBirth('');
            setSecondaryEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setRole('User');
        }

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
                                <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required className="form_input mb-2" type='text'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Last Name
                                </span>
                                <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} required className="form_input mb-2" type='text'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Email
                                </span>
                                <input value={email} onChange={(e) => { setEmail(e.target.value) }} required className="form_input mb-2" type='email'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Location
                                </span>
                                <textarea value={location} onChange={(e) => { setLocation(e.target.value) }} required rows={5} className="form_input mb-2">
                                </textarea>
                            </label>
                            <label>
                                <span className="form_label">
                                    Mobile Number
                                </span>
                                <input value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} required className="form_input mb-2" type='text'>
                                </input>
                            </label>
                        </div>
                        <div>
                            <label>
                                <span className="form_label">
                                    Date of Birth
                                </span>
                                <input value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value); handleDateChange(e.target.value) }} required className="form_input mb-2" type='date'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Secondary email<span className="text-[0.5rem]">&nbsp;{'(optional)'}</span>
                                </span>
                                <input value={secondaryEmail} onChange={(e) => { setSecondaryEmail(e.target.value) }} className="form_input mb-2" type='email'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Username
                                </span>
                                <input value={username} onChange={(e) => { setUsername(e.target.value) }} required className="form_input mb-2" type='text'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Password
                                </span>
                                <input onBlur={checkPassword} value={password} onChange={(e) => { setPassword(e.target.value),setPasswordError(false) }} required className="form_input mb-2" type='password'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Confirm Password
                                </span>
                                <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required className="form_input mb-2" type='password'>
                                </input>
                            </label>
                            <label>
                                <span className="form_label">
                                    Role
                                </span>
                                <select value={role} onChange={(e) => { setRole(e.target.value) }} className="form_input mb-2">
                                    <option value={'User'} label="User"></option>
                                    <option value={'Admin'} label="Admin"></option>
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