import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap"
import ImgBg from "./../img/undraw_remotely_2j6y.svg"
import LogoGoogle from './../img/001-google.png';
import './../css/login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, providerGmail, signInWithPopup } from "../config/Firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
  
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    const signInGmail = async () => {
        try {
            await signInWithPopup(auth, providerGmail);
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='content'>
            <div className='container'>
                <Row>
                    <Col xs={12} sm={6} md={6}>
                        <Image src={ImgBg} alt='Image' className='img-fluid'/>
                    </Col>
                    <Col xs={12} sm={6} md={6} className='contents'>
                        <Row className='justify-content-center'>
                            <Col md={8}>
                                <div className='mb-4'>
                                    <h3>SIGN IN</h3>
                                    <p className='mb-4'>Please sign-in to download icon</p>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    <div className="form-group mb-2 field--not-empty">
                                        <label for="email">E-mail</label>
                                        <input type="email" className="form-control" id="email" name="email" autocomplete="off"/>
                                    </div>
                                    <div className="form-group last mb-4 field--not-empty">
                                        <label for="password">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" autocomplete="off"/>
                                    </div>
                                    <Button type="submit" variant="primary" className='w-100'>MASUK</Button>
                                    <Button type="button" variant="primay" className="w-100" disabled style={{'display':'none'}}>
                                        <Spinner animation="border" variant="primary"/>
                                    </Button>
                                    <div className='pt-3'>
                                        <Row>
                                            <Col xs={12}>
                                                <p className='text-center'>or with</p>
                                            </Col>
                                            <Col xs={12}>
                                                <Button type='button' variant="outline-danger" onClick={signInGmail} className='btn-light w-100'><img src={LogoGoogle} style={{width:"20px"}} alt="Logo"/> Google</Button>
                                            </Col>
                                        </Row>
                                        <Row className='pt-3'>
                                            <Col xs={6}>
                                                <Link to='/' className='text-primary text-decoration-none'>Home</Link>
                                            </Col>
                                            <Col xs={6}>
                                                <Link to='/registrasi' className='text-primary float-end text-decoration-none'>Registrasi</Link>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Login