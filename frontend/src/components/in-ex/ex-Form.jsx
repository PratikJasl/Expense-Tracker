import { useState } from "react"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { ExpenseFormSubmit } from "../../Atom/selection";
import { UserInfo } from "../../Atom/userData";

export default function ExpenseForm(){

    const [input, setInput] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const [ExpenseSubmitted, setExpenseSubmitted] = useRecoilState(ExpenseFormSubmit);

    const { title, amount, date, category, description } = input;

    const userInfo = useRecoilValue(UserInfo);
    console.log('The Userinfo:', userInfo);
    const userID = userInfo.id;
    console.log('the User ID is:', userID);

    const handleInput = (name, value)=>{
        setInput({...input, [name]: value});
    }

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            const response = await fetch('https://expense-tracker-api-two.vercel.app/addExpenses',{
                method: 'Post',
                body: JSON.stringify({title, amount, date, category, description, userID}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include' 
            })
            if(response.ok){
                alert('Expense Added Successfully');
                setInput({
                    title: '',
                    amount: '',
                    date: '',
                    category: '',
                    description: '',
                });
                setExpenseSubmitted(prev => !prev);
            }
            else{
                alert('Error Adding Expense');
                setExpenseSubmitted(prev => !prev);
            }
        }
        catch(error){
            console.log('Error while adding Expense:', error);
        }
    }

    return(
        <form className="mr-5" onSubmit={handleSubmit}>
            <div className="mb-2">                                
                <input 
                    className="w-fit shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name={'title'}
                    placeholder="Expense Title"
                    value={title}
                    onChange={(ev) => handleInput('title',ev.target.value)}/>
            </div>
            <div className="mb-2">
                <input 
                    className="w-fit shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="amount"
                    name={'amount'}
                    placeholder="Expense Amount"
                    value={amount}
                    onChange={(ev) => handleInput('amount', ev.target.value)}/>
            </div>
            <div className="mb-2">
                <DatePicker
                    className="w-fit shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="date"
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat='dd/MM/yyyy'
                    onChange={(date) => handleInput('date',date)}/>
            </div>
            <div className="mb-2">
                <select
                    className="w-fit shadow appearance-none border rounded  py-2 px-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="category"
                    value={category}
                    onChange={(e) => handleInput('category', e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Investment">Investment</option>
                    <option value="Food">Food</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div className="mb-2">
                <textarea 
                        className="w-fit shadow appearance-none border rounded py-2 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name={'Description'}
                        placeholder="Description"
                        value={description}
                        onChange={(ev) => handleInput('description',ev.target.value)}/>
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="w-fit bg-green-600 hover:bg-black text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                Add Expense
                </button>
            </div>
        </form>
    )
}