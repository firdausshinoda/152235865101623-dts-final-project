import { Form, Navbar, Nav } from 'react-bootstrap';
import ImgLogo from './../img/logo.svg';
import ImgDefault from './../img/user_default.jpg';
import './../css/costume-ui.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/Firebase';
import { signOut } from 'firebase/auth';

const NavBar = ({onSearch}) => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const q = data.get('query')
        if(q!=='') {
            onSearch(q)
        }
    }
    

    const onLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Navbar className='navbar navbar-expand-lg navbar-light bg-white border-bottom py-1 px-5' sticky='top'>
            <Link to='/' class='navbar-brand d-none px-2 d-xl-block'>
                <img src={ImgLogo} class='d-inline-block align-top' alt='Iconfinder' width='168' height='28'/>
            </Link>
            <Form className='nav-search-form form-autocomplete' onSubmit={handleSubmit}>
                <div className='input-group'>
                    <input id="nav-search-input" class="form-control border-0 autocomplete" type="text" name="query" placeholder="Search for illustrations..." autoComplete="off"/>
                    <div class="input-group-append">
                        <button type="submit" className='btn btn-submit'>
                            <i className='fas fa-search text-dark m-auto'></i>
                        </button>
                    </div>
                </div>
            </Form>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className='ms-auto'>
                    { !user ? <Link to='/login' className='nav-link'><i className='fas fa-user'></i></Link> : null }
                    { 
                        user && user.photoURL !== null ? 
                            <Link to='/account' className='nav-link'><img src={user.photoURL} className='img-circle' style={{'width':'30px'}}/></Link> 
                            : <Link to='/account' className='nav-link'><img src={ImgDefault} className='img-circle' style={{'width':'30px'}}/></Link>}
                    { user ? <Link to='/logout' className='nav-link' onClick={onLogout}><i className='fas fa-sign-out-alt text-black'></i></Link> : null }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;