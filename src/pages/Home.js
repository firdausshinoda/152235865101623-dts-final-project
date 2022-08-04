import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ImgLogo from './../img/logo.svg';
import ImgDefault from './../img/user_default.jpg';
import './../css/home.css';
import Footer from '../componen/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/Firebase';
import { signOut } from 'firebase/auth';

const Home = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const q = data.get('query');
        if(q!=='') {
            navigate("/search?query="+q);
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
        <div className='search-page'>
            <Navbar collapseOnSelect bg="white" variant='white' expand='lg'>
                <Container>
                    <Link to='/'>
                        <img src={ImgLogo} alt="LOGO" className='w-25'/>
                    </Link>
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
                </Container>
            </Navbar>
            <div style={{marginTop:'25vh'}}>
                <div className='container text-center'>
                    <div className='row'>
                        <div className='col-lg-10 col-xl-8 offset-lg-1 offset-xl-2 py-5 mb-5'>
                            <h1 className='search-text'>CARI ICON <b>FAVORITMU</b></h1>
                            <div className='mt-5'>
                                <Form onSubmit={handleSubmit} className='search-form form-autocomplete focus'>
                                    <div className='input-group input-group-lg'>
                                        <input className='form-control border-0' type="text" name="query" id='query' placeholder="Search 6M icons, 3D and illustrations..." autoComplete='off'/>
                                        <div className='input-group-append m-auto'>
                                            <button type="submit" className='btn btn-submit'>
                                                <i className='fas fa-search text-dark m-auto'></i>
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='position-absolute text-center w-100' style={{bottom:'0'}}>
                <Footer/>
            </div>
        </div>
    )
}

export default Home