import { Icon } from '@iconify/react';
import {useCookies} from "react-cookie"
import TextInput from "../components/shared/Textinput"
import PasswordInput from "../components/shared/Passwordinput"
 import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';


const SignupComponent = () => {

    const [email,setEmail] = useState("");
    const [confirmEmail,setConfirmEmail] = useState("");
    const [userName,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");

    const [cookie,setCookie] = useCookies(["token"]);
    const navigate = useNavigate()

    const signUp = async()=>{
        if(email!== confirmEmail){
            alert("Email and confirm email fields must match. PLEASE CHECK AGAIN.. ")
            return;
        }
        const data = {email,password,userName,firstName,lastName}
        //console.log(data);
        const response = await makeUnauthenticatedPOSTRequest("/auth/register",data)
        if(response && !response.err){
            //console.log(response);
            const token = response.token;
            const date = new Date()
            date.setDate(date.getDate()+30)
            setCookie("token",token,{path: "/",expires:date})
            alert("sucess")
            navigate("/home")
        }else{
            alert("failure")
        }

    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <Icon icon="logos:spotify" width="165" />
            </div>
            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                <div className='font-bold mb-4 text-2xl'>
                    Sign up for free to start listening
                </div>
                <TextInput 
                className="my-6" 
                label="Email address" 
                placeholder="Enter your email"
                value={email}
                setValue={setEmail} />

                <TextInput 
                className="mb-6"
                label="Confirm Email Address" 
                placeholder="Enter your email again "
                value={confirmEmail}
                setValue={setConfirmEmail} />
                
                <TextInput 
                className="mb-6" 
                label="Username" 
                placeholder="Enter your username "
                value={userName}
                setValue={setUsername} />

                <PasswordInput 
                label="Password" 
                placeholder="Enter a strong password"
                value={password}
                setValue={setPassword} />

                <div className="w-full flex justify-between items-center first-letter space-x-8">
                <TextInput 
                className="my-6" 
                label="First Name" 
                placeholder="Enter your First Name. "
                value={firstName}
                setValue={setFirstName} />

                <TextInput 
                className="my-6" 
                label="Last Name" 
                placeholder="Enter a Last Name. "
                value={lastName}
                setValue={setLastName} />
                </div>

                <div className=" w-full flex items-center justify-center my-8">
                    <button className='bg-green-400 font-semibold p-3 px-8 rounded-full'
                    onClick={(e)=>{
                        e.preventDefault();
                        signUp();
                    }}>Sign Up</button>
                </div>

                <div className="w-full border border-solid border-gray-300 "></div>
                <div className="my-6 font-semibold text-lg">
                    Already have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold ">
                   <Link to="/login"> LOG IN INSTEAD</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupComponent;