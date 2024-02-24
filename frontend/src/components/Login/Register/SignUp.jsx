import { useState } from "react";
import { Username, Password } from "../../../Atom/userData";
import { useRecoilState } from "recoil";
import { Navigate } from 'react-router-dom';

export default function SignUp(){
    const [username, setUsername] = useRecoilState(Username);
    const [password, setPassword] = useRecoilState(Password);
    const [redirect, setRedirect] = useState(false);

    async function Register(ev){
        try{
            ev.preventDefault();
            await fetch('https://expense-tracker-api-iota.vercel.app/SignUp',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
            })
            .then((response)=>{
                if(response.status === 200){
                    alert('SignUp Successfull');
                    setRedirect(true);
                }
                else{
                    if(response.status === 401){
                        alert('Username Already Exists');
                        setRedirect(true);
                    }else{
                        alert(`SignUp failed`);
                    }
                }
            }) 
        }
        catch(error){
            console.log('Error SigningUp:',error.response.data.msg);
            alert('Error in SigningUp, Please try again');
        }
    }
    if(redirect){
        return <Navigate to={'/Login'}/>
    }
    return(
        <form className="flex flex-col justify-center text-center items-center gap-1.5 mt-4 p-1" onSubmit={Register}>
            <img 
                src="src/components/Navbar/logo.jpg"
                className="h-32 p-4 sm:h-40 md:h-48 lg:h-56 rounded-full"
            />
            <h1 className="text-3xl font-bold text-green-600 ">SignUp Now</h1>
            <input 
                className="border-2 m-1 rounded-md text-center"
                type="text"
                placeholder="username"
                value={username}
                onChange={(ev)=>{setUsername(ev.target.value)}}/>
            <input 
                className="border-2 m-1 rounded-md text-center"
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <button
                className="border-2 px-16 py-0.5 bg-green-600 text-white rounded-md hover:bg-black">
                SignUp
            </button>
        </form>
    )
}
