import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navbar/navbar'
import Login from './components/Login/Register/login'
import SignUp from './components/Login/Register/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Charts from './components/Dashboard/Charts'
import Transaction from './components/Transactions/Transactions'
import Expenses from './components/in-ex/expenses'
import Incomes from './components/in-ex/incomes'
import { UserInfo } from "./Atom/userData";
import { Selection } from "./Atom/selection"
import { useRecoilState } from 'recoil';


function App() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [selection, setSelection] = useRecoilState(Selection);
  const username = userInfo?.username;
  let selectedComponent;

  switch (selection) {
    case 1:
      selectedComponent = <Charts />;
      break;
    case 2:
      selectedComponent = <Transaction />;
      break;
    case 3:
      selectedComponent = <Expenses />;
      break;
    case 4:
      selectedComponent = <Incomes />;
      break;
    default:
      selectedComponent = <Charts />;
      break;
  }
  
  return (
      <main>
        {!username && (
          <main className='flex flex-col gap-10 pt-16 items-center text-center bg-white'>
            <Navigation/>
            <Routes>
              <Route path='/' element = {<LandingPage/>}/>
              <Route path='/Login' element = {<Login/>}/>
              <Route path='/SignUp' element = {<SignUp/>}/>
              <Route path='/Dashboard' element = {<Dashboard/>}/>
              <Route path='/Charts' element = {<Charts/>}/>
              <Route path='/Expenses' element = {<Expenses/>}/>
            </Routes>
          </main>
        )}
        {username && (
          <main className='pt-16 items-center text-center bg-white'>
            <Navigation/>
            <div className='flex flex-wrap'>
              <div className='w-full sm:w-64 '> 
                <Dashboard/>
              </div>
              <div className='w-full sm:flex-1 m-4 rounded-xl shadow-md border p-3 overflow-auto scroll-smooth h-fit'>
                {selectedComponent}
              </div>
            </div>
          </main>  
        )}
      </main>
  )
}

export default App
