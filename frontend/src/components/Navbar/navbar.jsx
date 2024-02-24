import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { UserInfo } from "../../Atom/userData";
import { useRecoilState } from 'recoil';
export default function Navigation(){
    const [userInfo, setUserInfo] = useRecoilState(UserInfo);
    const username = userInfo?.username;

    function logout(){
        fetch('http://localhost:3000/logout',{
          method: 'POST',
          credentials: 'include'
        });
        setUserInfo(null);
    }

    return(
        <Navbar className='bg-white w-full fixed top-0 shadow-sm z-50'>
        <Container>
            <img src="src/components/Navbar/logo.jpg" className='h-8 rounded-full'/>
            <Navbar.Brand 
                className="me-auto text-1xl font-bold text-green-600 ml-2"
                >
                Expense Tracker
            </Navbar.Brand>
            <Navbar.Toggle 
            aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {username && (
                    <Nav className="ms-auto">
                        <Nav.Link 
                            onClick={logout}
                            as={Link} to='/'
                            className='hover:text-green-600'>
                            <i class="fa-solid fa-right-from-bracket mr-1"/>
                            Sign Out
                        </Nav.Link> 
                    </Nav>
                )}
                {!username && (
                    <Nav className="ms-auto">
                        <Nav.Link 
                            as={Link} to='/SignUp'
                            className='hover:text-green-600'>
                            SignUp
                        </Nav.Link> 
                        <Nav.Link 
                            as={Link} to='/Login'
                            className='hover:text-green-600'>
                            LogIn
                        </Nav.Link>
                    </Nav>
                )}  
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}