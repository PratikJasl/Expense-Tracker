export default async function fetchExpense(){
    try{
        const response = await fetch('http://localhost:3000/getExpenses',{
            method: 'GET',
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