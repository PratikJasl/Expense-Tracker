import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { UserInfo } from "../../Atom/userData";
import { Selection } from "../../Atom/selection"
import { useState, useEffect } from "react";
import { display } from "../../Atom/display";
import { displayExForm } from "../../Atom/display";

export default function Dashboard(){
    const userInfo = useRecoilValue(UserInfo);
    const username = userInfo.username;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selection, setSelection] = useRecoilState(Selection);
    const setDisplayForm = useSetRecoilState(display);
    const setExDisplayForm = useSetRecoilState(displayExForm);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    console.log('value of selection is: ',selection);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsSidebarOpen(true);
        console.log("Screen width changed to:", screenWidth);
    }, [screenWidth]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return(
        <>
            <div className={`block fixed left-0 overflow-auto transition-all duration-300 bg-white z-10 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
                <div className="border rounded-xl shadow-md m-4 p-4 h-96 ">
                    <div className="flex text-center justify-center items-center mb-3">
                        <img 
                            src="src/assets/avatar.png"
                            alt="picture"
                            className="h-12 m-1 bg-green-50 rounded-full shadow-md border-3 border-green-600"
                        />
                        {username && (
                            <h1 className="text-xl font-serif text-green-600">{username}</h1>
                        )}
                    </div>
                    <ul className="text-left font-Nunito">
                        <li className="hover:text-green-600 pb-2" onClick={() => setSelection(1)}> 
                            <i className="fa-solid fa-chart-line"/> Dashboard
                        </li>
                        <li className="hover:text-green-600 pb-2" onClick={() => {setSelection(2); setDisplayForm(true); setExDisplayForm(true)}}> 
                            <i className="fa-solid fa-money-bill-transfer"/> View Transactions
                        </li>
                        <li className="hover:text-green-600 pb-2" onClick={() => {setSelection(3); setExDisplayForm(false) }}> 
                            <i className="fa-solid fa-credit-card"></i> Expenses
                        </li>
                        <li className="hover:text-green-600 pb-2" onClick={() => {setSelection(4); setDisplayForm(false) }}> 
                            <i className="fa-solid fa-money-bill-trend-up"></i> Incomes
                        </li>
                    </ul>
                </div>  
            </div>
            <button className='block md:hidden fixed left-0 p-1 borded rounded shadow-md bg-gray-400 z-50' 
                onClick={toggleSidebar}>
                <i className={`fa-solid ${isSidebarOpen ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
            </button>
        </>

    )
}