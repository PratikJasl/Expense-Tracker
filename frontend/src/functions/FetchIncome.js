
export default async function fetchIncome(userID){
    try{
        const response = await fetch('https://expense-tracker-api-two.vercel.app/getIncome',{
            method: 'POST',
            body: JSON.stringify({userID}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include' 
        })
        if(response.ok){
            console.log('Received Income Data Successfully');
            const incomeDataArray = await response.json();
            console.log('income array:', incomeDataArray);
            return incomeDataArray;
        }
        else{
            console.log('Error fetching Income data')
        }
    }
    catch(error){
        console.log('Error fetching Income data', error);
    }
}