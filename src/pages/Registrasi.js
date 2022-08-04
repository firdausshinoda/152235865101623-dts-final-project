import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import ImgBg from "./../img/undraw_remotely_2j6y.svg"
import './../css/login.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../config/Firebase";

const Registrasi = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
  
        try {
            const { user } = await createUserWithEmailAndPassword(auth,email,password)
            navigate('/')
          } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='content'>
            <div className='container'>
                <Row>
                    <Col xs={12} sm={6} md={6}>
                        <Image src={ImgBg} alt='Image' className='img-fluid'/>
                    </Col>
                    <Col xs={12} sm={6} md={6} className='contents pt-5 mt-5'>
                        <Row className='justify-content-center'>
                            <Col md={8}>
                                <div className='mb-4'>
                                    <h3>REGISTRASI</h3>
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
                                                <Link to='/' className='text-white float-end'>Login</Link>
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

export default Registrasi