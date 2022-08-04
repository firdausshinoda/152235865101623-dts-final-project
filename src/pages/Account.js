import { Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Footer from "../componen/Footer"
import NavBar from "../componen/NavBar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/Firebase';
import ImgDefault from './../img/user_default.jpg';

const Account = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const onSearch = (text) => {
        navigate('/search?query='+text)
    }

    return (
        <div>
            <NavBar onSearch={onSearch}/>
            <Container className="pt-5" style={{'minHeight':'87vh'}}>
                <Row className="w-100">
                    <div className="col-12 col-sm-6 col-md-6 offset-sm-3 offset-md-3">
                        <h1><b>Profil Details</b></h1>
                        <p className="text-black"><b>Welcome back, {user.email}</b></p>
                        <hr/>
                        <div className="text-center">
                            { 
                                user && user.photoURL !== null ? 
                                    <img src={user.photoURL} className='img-circle mb-3' style={{'width':'20%'}}/> 
                                    : <img src={ImgDefault} className='img-circle mb-3' style={{'width':'20%'}}/> }
                            { user.displayName !== null ? <h5><b>{user.displayName}</b></h5> : null}
                            { user.email !== null ? <h5><b>{user.email}</b></h5> : null}   
                        </div>
                    </div>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Account