import './Card.scss'
import {Card, Button, Row, Col, Modal } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { ContextVariables } from '../App'


export function CardMovie({movieImg, movieData, movieName, moviePrice, movieRate, movieGender, hidden}){

    const {context, setContext} = useContext(ContextVariables)
    const [modal, setModal] = useState({
        titulo:'',
        message:'',
        show: false

    })
    
    const onClickFavorite = (e) => {
        const favorito = {movieName, moviePrice, movieImg}
        e.preventDefault()
        // eslint-disable-next-line no-unused-expressions
        context.favorito.findIndex(i => i.movieName === favorito.movieName) === -1  ? setContext({...context, favorito: [...context.favorito, favorito]}) : ""
        // console.log(context);
    }
    const onClickCarrinho = (e) => {
        const carrinho = {movieName, movieQtd: 1, moviePrice, movieImg}
        e.preventDefault()
        // eslint-disable-next-line no-unused-expressions
        if(context.carrinho.findIndex(i => i.movieName === carrinho.movieName) === -1){
            setContext({...context, carrinho: [...context.carrinho, carrinho]}) 
            setModal({...modal, show:true, title:"Filme Adicionado ao Carrinho", message:`O filme '${movieName}' foi adicionado ao seu carrrinho. Click no botão superior direito para ver mais detalhes.`})
            return
        } 

    }

    useEffect(()=> {
    },[context])
    
    return(
        <section>
            <Card className='cardMovies'>
                <Card.Img variant='top' src={movieImg}>
                </Card.Img>
                <Card.Body className='text-center'>
                <Card.Text className='dataMovie'>
                        {movieData}
                </Card.Text>
                    <span className='movieFavorite'>
                        {
                            context.favorito.findIndex(item => item.movieName === movieName) !== -1 ?
                            <button className="bi bi-heart-fill" style={{color:'red'}} title="Meu Favorito" onClick={onClickFavorite}>
                            </button>
                            :
                            <button className="bi bi-heart-fill" title="Favoritar" style={{color:'blue'}} onClick={onClickFavorite}>
                            </button>
                        }
                    </span>
                    <Row className='justify-content-center movieTitle'>
                        <Col>
                            {movieName}
                        </Col>
                    </Row>
                    <Card.Text className='d-flex flex-column'>
                        <span><i className="bi bi-star-fill"></i> {movieRate}</span>
                        <span>{movieGender}</span>
                        <span>R$ {moviePrice}</span>
                    </Card.Text>
                </Card.Body>
                {
                    context.carrinho.findIndex(item => item.movieName === movieName) !== -1 ?
                    <Button variant='success' onClick={onClickCarrinho} disabled>Adicionado <i className="bi bi-check-circle"></i></Button>
                    :
                    <Button variant='primary' onClick={onClickCarrinho}>Adicionar</Button>

                }

            </Card>
            
            <ModalReposta
            show={modal.show}
            title={modal.title}
            message={modal.message}
            onHide={() => setModal(false)}
            /> 
        </section>
    )
}


function ModalReposta(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='alert'>
            {props.message}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }