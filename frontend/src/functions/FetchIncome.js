
export default async function fetchIncome(){
    try{
        const response = await fetch('http://localhost:3000/getIncome',{
            method: 'GET',
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