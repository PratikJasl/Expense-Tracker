import { useEffect, useState } from "react";
import IncomeForm from "./in-Form";
import fetchIncome from "../../functions/FetchIncome";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IncomeFormSubmit } from "../../Atom/selection";
import { display } from "../../Atom/display";
import { IncomesArray } from "../../Atom/incomes";

export default function Incomes(){

    const [incomeArray, setIncomeArray] = useState([]);
    const formSubmitted = useRecoilValue(IncomeFormSubmit);
    const [change, setChange] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
    const [forceUpdate, setForceUpdate] = useState(false);
    const displayForm = useRecoilValue(display);
    const setIncomesArray = useSetRecoilState(IncomesArray);
   
    useEffect(()=>{
        async function fetchData(){
            try {
                const data = await fetchIncome();
                setIncomeArray(data);
                setIncomesArray(data);
                GetTotal();
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        }
        fetchData();
    },[formSubmitted, change, forceUpdate]);

    async function DeleteIncome(id){
        try{
            const response = await fetch('http://localhost:3000/deleteIncome',{
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include' 
            })
            if(response.ok){
                alert('Income Deleted');
                setChange(true);
                setForceUpdate(prev => !prev);
            }
            else{
                console.log('Error Deleting Income');
            } 
        }
        catch(error){
            console.log('Error Deleting Income',error);
        }
    }

    async function GetTotal(){
        try {
            const response = await fetch('http://localhost:3000/getTotalIncome',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            if(response.ok){
                console.log('Received Income Total Successfully');
                const total = await response.json();
                setTotalIncome(total.total);
                console.log('total income::', total);
            }
            else{
                console.log('Error Getting Total Income');
            }
        } catch (error) {
            console.log('Error Getting Total Income',error);
        }
    }

    return(
        <div>
            <div className=" mb-2 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <h1 className="text-xl font-bold">Total Income: 
                <span className="text-green-600"> <i className="fa-solid fa-indian-rupee-sign"></i> {totalIncome ? totalIncome : "Loading..."} </span></h1>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:gap-2 lg:gap-5 xl:gap-32">
                {!displayForm && (
                    <IncomeForm></IncomeForm>
                )}
               <div className="pt-2 sm:pt-0">
                {incomeArray ? (
                    incomeArray.map((income, index)=>{
                            const formattedDate = new Date(income.date).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                            return(
                                <div key={index} className="w-full mb-2 shadow border rounded p-2 text-gray-700 text-center items-center flex">
                                    <div className="shadow border rounded p-1">
                                        <i className="fa-solid fa-earth-asia text-xl sm:text-4xl"></i>
                                    </div>
                    
                                    <div className="flex-col">
                                        <h1 className="text-lg sm:text-xl"><i class="fa-solid fa-circle-dot text-green-600"></i> {income.title}</h1>
                                        <div className=" w-full flex gap-3 px-2 py-2">
                                            <h2><i className="fa-solid fa-indian-rupee-sign"></i> {income.amount}</h2>    
                                            <h2><i className="fa-regular fa-calendar-days"></i> {formattedDate}</h2>  
                                            <h2 className="sm:text-sm"><i className="fa-solid fa-comment "></i> {income.description}</h2> 
                                        </div>
                                    </div>

                                    <button className="ml-auto" onClick={ () => {DeleteIncome(income._id)} }>
                                        <i className="fa-solid fa-trash text-lg sm:text-3xl"></i>  
                                    </button>  
                                </div> 
                            );  
                    })
                ) : (
                    <div> Loading... </div>
                )}
               </div>
            </div>
        </div>
    )
}