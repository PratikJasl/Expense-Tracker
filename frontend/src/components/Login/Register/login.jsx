import { useState } from "react";
import { Username, Password, UserInfo } from "../../../Atom/userData";
import { useRecoilState } from "recoil";
import { Navigate } from 'react-router-dom';

export default function Login(){
    const [username, setUsername] = useRecoilState(Username);
    const [password, setPassword] = useRecoilState(Password);
    const [userInfo, setUserInfo] = useRecoilState(UserInfo);
    const [redirect, setRedirect] = useState(false);

    async function login(ev){
        try{
            ev.preventDefault();
            const response = await fetch('http://localhost:3000/Login',{
                method: 'Post',
                body: JSON.stringify({username, password}),
                headers: {'Content-type':'application/json'},
                credentials: 'include'
            });
            if(response.ok){  
                response.json().then(userinfo =>{
                setUserInfo(userinfo);
                console.log('UserInfo is:',userInfo);
                alert('Login Successful');
                setRedirect(true);
                })
            }
            else{
                alert('Login Failed, Wrong Credentials');
            }
        }catch(error){
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    }
    if(redirect){
        return <Navigate to={'/'} />
    }
    return(
        <form className="flex flex-col justify-center text-center items-center gap-1.5 mt-4 p-1" onSubmit={login}>
            <img 
                src="src/components/Navbar/logo.jpg"
                className="h-32 p-4 sm:h-40 md:h-48 lg:h-56 rounded-full"
            />
            <h1 className="text-3xl font-bold text-green-600 ">Login</h1>
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
            className="border-2 px-16 py-0.5 bg-green-600 text-white rounded-md hover:bg-black">Login</button>
        </form>
    )
}