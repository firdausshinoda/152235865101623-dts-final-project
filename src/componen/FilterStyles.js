import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import API from "../config/API"


const FilterStyles = ({ckStyle, onFStyle}) => {
    const [styles, setStyles] = useState([])
    
    const getStyles = async() => {
        try {
            const response = await API.get('styles&count=13')
            setStyles(response.data.styles)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=> {
        getStyles()
    },[])

    return (
        <fieldset>
            <Form.Check>
                <Form.Check.Input type='radio' name='filterStyle' id='styleAll' value='all' onChange={e=>onFStyle(e.currentTarget.value)} checked={ckStyle==="all"||ckStyle===null}/>
                <Form.Check.Label for='styleAll'>All Style</Form.Check.Label>
            </Form.Check>
            {styles.map((style, i) => {    
                return (
                    <Form.Check key={i}>
                        <Form.Check.Input type='radio' name='filterStyle' id={'style'+style.identifier} value={style.identifier} onChange={e=>onFStyle(e.currentTarget.value)} checked={ckStyle===style.identifier}/>
                        <Form.Check.Label for={'style'+style.identifier}>{style.name}</Form.Check.Label>
                    </Form.Check>
                )
            })}
        </fieldset>
    )
}

export default FilterStyles