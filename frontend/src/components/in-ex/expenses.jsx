import ExpenseForm from "./ex-Form";
import fetchExpense from "../../functions/FetchExpense";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ExpenseFormSubmit } from "../../Atom/selection";
import { displayExForm } from "../../Atom/display";
import { ExpensesArray } from "../../Atom/incomes";
import { UserInfo } from "../../Atom/userData";

export default function Expenses(){

    const [expenseArray, setExpenseArray] = useState([]);
    const formSubmitted = useRecoilValue(ExpenseFormSubmit);
    const [change, setChange] = useState(false);
    const [totalExpense, setTotalExpense] = useState(0);
    const [forceUpdate, setForceUpdate] = useState(false);
    const displayForm = useRecoilValue(displayExForm);
    const setExpensesArray = useSetRecoilState(ExpensesArray);
    const userInfo = useRecoilValue(UserInfo);
    const userID = userInfo.id;

    useEffect(()=>{
        async function fetchData(){
            try {
                const data = await fetchExpense(userID);
                setExpenseArray(data);
                setExpensesArray(data);
                GetTotal();
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        }
        fetchData();
    },[formSubmitted, change, forceUpdate]); 

    async function DeleteExpense(id){
        try{
            const response = await fetch('https://expense-tracker-api-iota.vercel.app/deleteExpenses',{
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include' 
            })
            if(response.ok){
                alert('Expense Deleted');
                setChange(true);
                setForceUpdate(prev => !prev);
            }
            else{
                console.log('Error Deleting Expense');
            } 
        }
        catch(error){
            console.log('Error Deleting Expense',error);
        }
    }

    async function GetTotal(){
        try {
            const response = await fetch('https://expense-tracker-api-iota.vercel.app/getTotalExpense',{
                method: 'POST',
                body: JSON.stringify({userID}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            if(response.ok){
                console.log('Received Expense Total Successfully');
                const total = await response.json();
                setTotalExpense(total.total);
                console.log('total expense::', total);
            }
            else{
                console.log('Error Getting Total Expense');
            }
        } catch (error) {
            console.log('Error Getting Total Expense',error);
        }
    }

    return(
        <div>
            <div className=" mb-2 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <h1 className="text-xl font-bold">Total Expense: 
                    <span className="text-green-600"> <i className="fa-solid fa-indian-rupee-sign"></i> {totalExpense != null ? totalExpense : 'Loading...'}</span></h1>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:gap-2 lg:gap-5 xl:gap-32">
                {!displayForm && (
                    <ExpenseForm></ExpenseForm>
                )}
               <div className="pt-2 sm:pt-0">
                   {expenseArray ? (
                        expenseArray.map((expense, index)=>{
                            const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
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
                                        <h1 className="text-lg sm:text-xl"><i class="fa-solid fa-circle-dot text-green-600"></i> {expense.title}</h1>
                                        <div className=" w-full flex gap-3 px-2 py-2">
                                            <h2><i className="fa-solid fa-indian-rupee-sign"></i> {expense.amount}</h2>    
                                            <h2><i className="fa-regular fa-calendar-days"></i> {formattedDate}</h2>  
                                            <h2 className="sm:text-sm"><i className="fa-solid fa-comment"></i> {expense.description}</h2> 
                                        </div>
                                    </div>

                                    <button className="ml-auto" onClick={ () => {DeleteExpense(expense._id)} }>
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