import { useRecoilState, useSetRecoilState } from 'recoil';
import { IncomesArray } from '../../Atom/incomes';
import { ExpensesArray } from '../../Atom/incomes';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title, LineElement, LinearScale, PointElement, CategoryScale);

export default function Charts(){
    const [incomesArray, setIncomesArray] = useRecoilState(IncomesArray);
    const [expensesArray, setExpensesArray] = useRecoilState(ExpensesArray);
    console.log("Incomes Array::", incomesArray);
    console.log("Expenses Array::", expensesArray);

    const data = {

        labels: incomesArray.map((incomes, index) => {
            const formattedDate = new Date(incomes.date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            return (formattedDate);
        }),

        datasets: [
            {
                label: 'Income',
                data:[
                    ...incomesArray.map((incomes) => {
                        const {amount} = incomes;
                        return(amount);
                    })
                ],
                backgroundColor: 'green',
                tension: 0.2
            },
            {
                label: 'Expense',
                data:[
                    ...expensesArray.map((expenses) => {
                        const {amount} = expenses;
                        return(amount);
                    })
                ],
                backgroundColor: 'red',
                tension: 0.2
            }
        ]
    }

    return(
        <>
            <div>
                <Line data={data} /> 
            </div>
        </>
    )
}