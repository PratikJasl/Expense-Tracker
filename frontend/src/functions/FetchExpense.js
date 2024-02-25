export default async function fetchExpense(userID){
    try{
        const response = await fetch('https://expense-tracker-api-two.vercel.app/getExpenses',{
            method: 'POST',
            body: JSON.stringify({userID}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include' 
        })
        if(response.ok){
            console.log('Received Expense Data Successfully');
            const expenseDataArray = await response.json();
            console.log('income array:', expenseDataArray);
            return expenseDataArray;
        }
        else{
            console.log('Error fetching Expense data')
        }
    }
    catch(error){
        console.log('Error fetching Expense data', error);
    }
}