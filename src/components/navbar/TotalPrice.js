import { Button } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TotalPrice({total}){
    return (
        <Container className='finalizarCompra'>
            <Row>
                <Col className="p-0">
                <div className='d-flex justify-content-between'>
                    <span>Total:</span>
                    <span style={{fontWeight:'bolder'}}>R$ {Number(total).toFixed(2)}</span>
                </div>
                </Col>
                {
                    document.location.pathname.match('/finalizar') ? 
                ""
                :
                <Button variant="primary">
                    <Link to='/finalizar'>
                        Finalizar Compra
                    </Link>
                </Button>
                }
            </Row>
        </Container>
    )
}