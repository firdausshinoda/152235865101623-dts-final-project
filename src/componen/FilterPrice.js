import { Form } from "react-bootstrap"

const FilterPrice = ({ckPremium,onFPremium}) => {
    return (
        <fieldset>
            <Form.Check>
                <Form.Check.Input type='radio' name='filterPrice' id='priceAll' value='2' checked={ckPremium==="2"||ckPremium===null} onChange={e=>onFPremium(e.currentTarget.value)}/>
                <Form.Check.Label for='priceAll'>All Price</Form.Check.Label>
            </Form.Check>
            <Form.Check>
                <Form.Check.Input type='radio' name='filterPrice' id='pricePremium' value='1' checked={ckPremium==="1"} onChange={e=>onFPremium(e.currentTarget.value)}/>
                <Form.Check.Label for='pricePremium'>Premium</Form.Check.Label>
            </Form.Check>
            <Form.Check>
                <Form.Check.Input type='radio' name='filterPrice' id='priceFree' value='0' checked={ckPremium==="0"} onChange={e=>onFPremium(e.currentTarget.value)}/>
                <Form.Check.Label for='priceFree'>Free</Form.Check.Label>
            </Form.Check>
        </fieldset>
    )
}

export default FilterPrice