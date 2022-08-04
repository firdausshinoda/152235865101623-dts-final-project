import { useEffect, useState } from "react"
import { Card, Col } from "react-bootstrap"

const ItemIcon = ({dtIcons,onModal}) => {
    const [img, setImg] = useState()
    
    useEffect(() => {
        if (dtIcons.raster_sizes[11] !== undefined) {
            setImg(dtIcons.raster_sizes[11].formats[0].preview_url)
        } else if (dtIcons.raster_sizes[10] !== undefined) {
            setImg(dtIcons.raster_sizes[10].formats[0].preview_url)
        } else if (dtIcons.raster_sizes[9] !== undefined) {
            setImg(dtIcons.raster_sizes[9].formats[0].preview_url)
        } else if (dtIcons.raster_sizes[8] !== undefined) {
            setImg(dtIcons.raster_sizes[8].formats[0].preview_url)
        } else if (dtIcons.raster_sizes[7] !== undefined) {
            setImg(dtIcons.raster_sizes[7].formats[0].preview_url)
        } else if (dtIcons.raster_sizes[6] !== undefined) {
            setImg(dtIcons.raster_sizes[6].formats[0].preview_url)
        } else if (dtIcons.raster_sizes[5] !== undefined) {
            setImg(dtIcons.raster_sizes[5].formats[0].preview_url)
        } else if (dtIcons.raster_sizes[4] !== undefined) {
            setImg(dtIcons.raster_sizes[4].formats[0].preview_url)
        }
    })

    return (
        <Col xs={6} sm={4} md={2} lg={1}>
            <Card className="card-costume card-costume-hover mb-3" onClick={() => onModal(true,dtIcons.icon_id)}>
                <Card.Img src={img}/>
            </Card>
        </Col>
    )
}

export default ItemIcon