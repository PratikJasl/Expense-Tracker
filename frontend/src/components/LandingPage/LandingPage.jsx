import { Link, useNavigate } from "react-router-dom";
export default function LandingPage(){
    const navigate = useNavigate();
    return(
        <div className="">
            <img 
                src="/LandingPagePic.png"
                alt="picture"
                className="h-64 p-4 sm:h-80 md:h-80 lg:h-96"
            />
            <h1 className="text-5xl mb-3.5 px-2"> Track Your Expenses </h1>
            <h2 className="text-xl mb-10 px-1"> Online platform to track your expenses, incomes, budget and more </h2>
            <button 
                className="mr-20 mb-20 bg-green-600 px-10 py-2 rounded-sm text-white hover:bg-black"
                onClick={() => navigate('/SignUp')}>
                SignUp </button>
            <button 
                className=" mb-20 bg-green-600 px-10 py-2 rounded-sm text-white hover:bg-black"
                onClick={() => navigate('/Login')}> 
                LogIn
            </button>
        </div>
    )
}
