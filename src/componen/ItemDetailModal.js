import { useEffect, useRef, useState } from "react"
import { Button, Col, Image, Modal, Row, Spinner, Tab, Tabs } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import API from "../config/API"
import UrlDownload from "../config/UrlDownload"
import { useAuthState } from 'react-firebase-hooks/auth';
import LogoGoogle from './../img/001-google.png';
import { auth, providerGmail, signInWithPopup } from "../config/Firebase";

const ItemDetailModal = ({show,onModalClose,idIcon}) => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const [iconId, setIconId] = useState("")
    const [iconDetail, setIconDetail] = useState([])
    const [iconImg, setIconImg] = useState("")
    const [loaderModal, setLoaderModal] = useState(false)
    const [iconPng, setIconPng] = useState([])
    const [iconOther, setIconOther] = useState([])


    const signInGmail = async () => {
        try {
            await signInWithPopup(auth, providerGmail);
        } catch (error) {
            alert(error.message);
        }
    }
    const getIcon = async() => {
        setIconDetail([])
        setIconPng([])
        setIconOther([])
        setIconImg("")
        setLoaderModal(true)

        try {
            const response = await API.get('icons/'+idIcon)
            setIconDetail(response.data)
            setLoaderModal(false)
        } catch (error) {
            alert(error)
            setLoaderModal(false)
        }
    }

    useEffect(() => {
        if (iconDetail.raster_sizes !== undefined) {
            setIconPng(iconDetail.raster_sizes)
            setIconOther(iconDetail.containers)
            if (iconDetail.raster_sizes[11] !== undefined) {
                setIconImg(iconDetail.raster_sizes[11].formats[0].preview_url)
            } else if (iconDetail.raster_sizes[10] !== undefined) {
                setIconImg(iconDetail.raster_sizes[10].formats[0].preview_url)
            } else if (iconDetail.raster_sizes[9] !== undefined) {
                setIconImg(iconDetail.raster_sizes[9].formats[0].preview_url)
            } else if (iconDetail.raster_sizes[8] !== undefined) {
                setIconImg(iconDetail.raster_sizes[8].formats[0].preview_url)
            } else if (iconDetail.raster_sizes[7] !== undefined) {
                setIconImg(iconDetail.raster_sizes[7].formats[0].preview_url)
            } else if (iconDetail.raster_sizes[6] !== undefined) {
                setIconImg(iconDetail.raster_sizes[6].formats[0].preview_url)
            } else if (iconDetail.raster_sizes[5] !== undefined) {
                setIconImg(iconDetail.raster_sizes[5].formats[0].preview_url)
            } else if (iconDetail.raster_sizes[4] !== undefined) {
                setIconImg(iconDetail.raster_sizes[4].formats[0].preview_url)
            }
        }
    }, [iconDetail])

    useEffect(() => {
        if (show) {
            getIcon()
        }
    },[show])

    return (
        <Modal show={show} onHide={() => onModalClose(false)} size="lg" aria-labelledby='contained-modal-title-vcenter' centered backdrop='static' keyboard={false}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className={loaderModal ? 'text-center':'d-none text-center'} style={{'height':'20vh','paddingTop':'10vh'}}>
                    <Spinner animation='border'/>
                </div>
                <Row className={loaderModal ? 'd-none':''}>
                    <Col xs={12} sm={4}>
                        <Image src={iconImg} className='w-100 border'/>
                    </Col>
                    <Col xs={12} sm={8}>
                        <div className={!user ? 'd-none' : null}>
                            <div className={iconDetail.is_premium ? 'd-none':''}>
                                <div className='clearfix'>
                                    <span className='float-left pe-1'>
                                        <i class="fas fa-check"></i>
                                    </span>
                                    <h5 class='mb-1'>Free icon</h5>
                                </div>
                                <p class="mb-2 text-black">
                                    You can download this icon
                                </p>
                                <Tabs defaultActiveKey='png' id='uncontrolled-tab-detail' className='mb-3'>
                                    <Tab eventKey='png' title='PNG'>
                                    { iconPng.map((iconPng, i) => {
                                        return (
                                            <a className='btn btn-sm btn-outline-secondary m-1' href={UrlDownload+iconPng.formats[0].download_url+'&name='+iconDetail.iconset.name+'&ext=png'}  target='_blank'>{iconPng.size} px</a>
                                        )   
                                    })}
                                    </Tab>
                                    <Tab eventKey='svg' title='SVG'>
                                        {iconDetail?.type === 'vector' ? <a className='btn btn-sm btn-outline-secondary m-1' href={UrlDownload+iconDetail.vector_sizes[0].formats[0].download_url+'&name='+iconDetail.iconset.name+'&ext=svg'}>Download SVG</a> : 'Tidak Ada'}
                                    </Tab>
                                    <Tab eventKey='other' title='OTHER'>
                                        { iconDetail?.type === 'vector' && iconDetail.vector_sizes[0].formats[1] !== undefined ? <a className='btn btn-sm btn-outline-secondary m-1' href={UrlDownload+iconDetail.vector_sizes[0].formats[1].download_url+'&name='+iconDetail.iconset.name+'&ext=ai'}>Download AI</a> : null}
                                        { iconOther.map((iconOther, i) => {
                                            return (
                                                <a className='btn btn-sm btn-outline-secondary m-1' href={UrlDownload+iconOther.download_url+'&name='+iconDetail.iconset.name+'&ext='+iconOther.format}  target='_blank'>{iconOther.format}</a>
                                            )   
                                        })}
                                        { iconOther.length === 0 ? <small className='text-center text-secondary'>Tidak Ada</small> : null}
                                    </Tab>
                                </Tabs>
                            </div>
                            <div className={iconDetail.is_premium ? '':'d-none'}>
                                <p className="text-black">This is a premium icon which is suitable for commercial work:</p>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-1">
                                        <i class="fas fa-check"></i>&nbsp;&nbsp;Use it commercially. No attribution required.
                                    </li>
                                    <li class="mb-1">
                                        <i class="fas fa-check"></i>&nbsp;&nbsp;Ready to use in multiple sizes
                                    </li>
                                    <li class="mb-1">
                                        <i class="fas fa-check"></i>&nbsp;&nbsp;Modify colors using the color editor
                                    </li>
                                    <li class="mb-1">
                                        <i class="fas fa-check"></i>&nbsp;&nbsp;1 credit needed as a Pro subscriber.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={user ? 'd-none' : null}>
                            <h4><b>To download the icon, you need to login first.</b></h4>
                            <Row className="pt-3">
                                <Col xs={12} sm={6}>
                                    <p className="mb-0 text-black">You have an account</p>
                                    <Link to='/login' className='text-decoration-none btn btn-outline-primary w-100'>Login</Link>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <p className="mb-0 text-black">Or with</p>
                                    <Button type='button' variant="outline-danger" onClick={signInGmail} className='btn-light w-100'><img src={LogoGoogle} style={{width:"20px"}} alt="Logo"/> Google</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default ItemDetailModal