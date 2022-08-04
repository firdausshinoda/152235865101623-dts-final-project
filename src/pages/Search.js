import { Button, Card, Form, Row, Spinner } from 'react-bootstrap';
import NavBar from "../componen/NavBar"
import Footer from "../componen/Footer"
import { useEffect, useState } from 'react';
import API from '../config/API';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FilterStyles from '../componen/FilterStyles';
import FilterPrice from '../componen/FilterPrice';
import ItemIcon from '../componen/ItemIcon';
import ItemDetailModal from '../componen/ItemDetailModal';

const Search = () => {
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()
    const [search, setSearch] = useState()
    const [icons, setIcons] = useState([])
    const [iconId, setIconId] = useState()
    const [modalShow, setModalShow] = useState(false);
    const [filter, setFilter] = useState({premium:'',style:'',query:'',count:108})
    const [urlQuery, setUrlQuery] = useState()
    const [loader, setLoader] = useState(false)
    const [loaderPagin, setLoaderPagin] = useState(false)
    const [countData, setCountData] = useState(0)

    const getIcons = async() => {
        var query = params.get('query')
        if (query !== '') {
            var queryParam = '&query='+query
            const paramPremium = params.get('premium')
            const paramStyle = params.get('style')
            const paramCount = params.get('count')
            if (paramPremium !== undefined && paramPremium !==null) {
                if (paramPremium !== '2') {
                    queryParam += '&premium='+paramPremium
                } else {
                    queryParam += '&premium=2'
                }
            }
            if (paramStyle !== undefined && paramStyle !==null) {
                if (paramStyle !== 'all') {
                    queryParam += '&style='+paramStyle
                } else {
                    queryParam += '&style=all'
                }
            }
            if (paramCount !== undefined && paramCount !==null) {
                queryParam += '&count='+paramCount
            }

            try {
                const response = await API.get('icons/search'+queryParam)
                setCountData(response.data.total_count)             
                setIcons(response.data.icons)
                setLoader(false)
                setLoaderPagin(false)
            } catch (error) {
                alert(error)
                setLoader(false)
                setLoaderPagin(false)
            }
        }
    }

    const onFPremium = (text) => {
        setFilter((prev)=>({...prev, premium : text}))
        setFilter((prev)=>({...prev, count : 108}))
    }
    const onFStyle = (text) => {
        setFilter((prev)=>({...prev, style : text}))
        setFilter((prev)=>({...prev, count : 108}))
    }
    const onSearch = (text) => {
        setFilter((prev)=>({...prev, query : text}))
        setFilter((prev)=>({...prev, count : 108}))
    }
    const onModalShow = (stt,id) => {
        setIconId(id)
        setModalShow(stt)
    }
    const onModalClose = (stt) => {
        setModalShow(stt)
    }

    const changeURL = async() => {
        const fStyle = filter?.style
        const fPremium = filter?.premium
        const fCount = filter?.count
        var queryParam = '?query='+filter?.query
        if(fPremium!==undefined && fPremium !==null) {
            queryParam += '&premium='+fPremium
        }
        if(fStyle!=='' && fStyle !==null) {
            queryParam += '&style='+fStyle
        }
        if(fCount!==undefined && fCount !==null) {
            queryParam += '&count='+filter?.count
        }
        
        setUrlQuery(queryParam)
        navigate('/search'+queryParam)
    }

    const loadMore = () => {
        setLoaderPagin(true)
    }

    useEffect(() => {
        getIcons()
    }, [urlQuery])

    useEffect(() => {
        if (loaderPagin) {
            setFilter((prev)=>({...prev, count : filter.count+108}))
            getIcons()
        }
    }, [loaderPagin])

    useEffect(() => {
        if(!loaderPagin) {
            setIcons([])
            setLoader(true)
        }
        changeURL()
    },[filter])

    useEffect(()=> {
        setFilter((prev)=>({...prev, query : params.get('query')}))
        setFilter((prev)=>({...prev, premium : params.get('premium')}))
        setFilter((prev)=>({...prev, style : params.get('style')}))
        setSearch(params.get('query').replace('-',' '))
    },[])

    return (
        <div>
            <ItemDetailModal show={modalShow} onModalClose={onModalClose} idIcon={iconId}/>
            <NavBar onSearch={onSearch}/>
            <div className='d-lg-flex p-4 min-height-lg'>
                <div className='search-sidebar'>
                    <Form className='d-none d-lg-block clearfix'>
                        <Card className='card-costume mb-3'>
                            <Card.Body>
                                <FilterPrice ckPremium={filter?.premium} onFPremium={onFPremium}/>
                            </Card.Body>
                        </Card>
                        <Card className='card-costume mb-3'>
                            <Card.Body>
                                <FilterStyles ckStyle={filter?.style} onFStyle={onFStyle}/>
                            </Card.Body>
                        </Card>
                    </Form>
                </div>
                <div className='main pt-2 ps-3'>
                    <h2 className='d-inline-block mr-2 mb-1 mt-3 mt-sm-0 tex text-capitalize'>{search} icons</h2>
                    <div className='d-none d-md-block text-truncate mb-4 pl-1'>
                        About {countData} results.
                    </div>
                    <div className={loader ? 'loader-data':'d-none loader-data'}>
                        <Spinner animation='border'/>
                    </div>
                    <Row>
                        { icons.map((icon, i) => {
                            return (
                                <ItemIcon dtIcons={icon} key={i} onModal={onModalShow}/> 
                            )   
                        })}
                    </Row>
                    { 
                        filter.count < countData && !loader ?
                           !loaderPagin ? 
                            <div className='text-center'>
                                <Button variant='outline-primary' className='text-center' onClick={() => loadMore()}>Load More</Button>
                            </div>
                            : null 
                        : null
                    }
                    <div className={loaderPagin ? 'text-center':'d-none text-center'}>
                        <Spinner animation='border' variant="primary"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Search