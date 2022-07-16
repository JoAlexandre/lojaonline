import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './Rightbar.scss'


import { useContext } from 'react'
import { ContextVariables } from '../App'
import { Link } from 'react-router-dom'
import ItemCarrinho from './ItemCarrinho'
import TotalPrice from './TotalPrice'


export default function RightBar({showCarrinho, showFavorito, aba }){
    const fade = showCarrinho || showFavorito  ? 'fadeIn' : 'fadeOut'

    const {context} = useContext(ContextVariables)

    // eslint-disable-next-line no-unused-expressions
    let data = aba.match('carrinho') ? 
         context.carrinho 
    : 
        aba.match('favorito') ? 
            context.favorito
        : 
            []

    useEffect(()=>{
        // console.log('rightbar');
    },[context])
    return(
        <div className={"rightBar "+ fade}>
            {
            aba.match('carrinho') ? 
            <>
                <h3>Meu Carrinho</h3>
                {
                    data.length ?
                    <div className='section-carrinho'>
                        <Container className='itens-carrinho'>
                            {
                                data.map((item, index) =>
                                        <ItemCarrinho key={index} {...item} classN='my-grid'/>
                                )
                            }
                            
                        </Container>  
                        <TotalPrice total={
                            context.carrinho.reduce((prev, next) => prev + Number(next.moviePrice)
                            ,0)} />
                    </div>
                    : 
                    ""
                }
            </>
            :
                ""
            }
            {
            aba.match('favorito') ? 
                <>
                    <h3>Meus Favoritos</h3>
                    <Container className='itens-favorito'>
                            {
                            data.length ? 
                                data.map((item, index) => <ItemFavorito key={index} {...item} />)
                                : 
                                ""
                            }
                    </Container>
                </>
            :
                ""
            }
        </div>
    )
}

function ItemFavorito({movieName, moviePrice, movieImg}){
    const {setContext} = useContext(ContextVariables)
    const onRemove = (e, movieName) => {
        e.preventDefault()
        setContext(lastData => ({...lastData, favorito: lastData.favorito.filter(item => item.movieName !== movieName)}))
    } 
    const onClickCarrinho = (e, movieName, moviePrice, movieQtd, movieImg) => {
        e.preventDefault()
        setContext(lastData => ({...lastData, carrinho: 
            
            lastData.carrinho.findIndex(item => item.movieName === movieName) !== -1 ? [...lastData.carrinho] :
                [
                    ...lastData.carrinho, 
                    {
                        movieName, 
                        moviePrice, 
                        movieQtd,
                        movieImg
                    }
                ]
        }))
    } 
    return(
        <div className="my-grid">
                <span title={movieName}>
                    <img src={movieImg} alt={movieName} />
                </span>
                <span title={movieName}>
                    {
                        movieName.length <=10 ? movieName : String(movieName).slice(0,10) + '...'
                    }
                </span>
                <span>
                    R$ {moviePrice}
                </span>
                <span className='qtd' title='Adicionar ao Carrinho'>
                    <button className='btn-right-bar' onClick={e => onClickCarrinho(e, movieName, moviePrice, 1, movieImg)}>
                        <i className="bi bi-cart"></i>
                    </button>
                </span>
                <span className='lixeira' title='Remover'>
                    <button className='btn-right-bar' onClick={e => onRemove(e, movieName)}>
                        <i className="bi bi-trash-fill"></i>
                    </button>   
                </span>
            </div>
        
        // <Row className="d-flex justify-content-between text-left itensCarrinho" >
        //     <span>
        //             <img src={movieImg} alt="" />
        //         </span>
        //     <Col sm={4} title={movieName}>
                
        //     </Col>
        //     <Col sm={4}>R$ {moviePrice}</Col>
        //     <Col sm={2}>
                
        //     </Col>
        //     <Col sm={2}>
                 
        //     </Col>
        // </Row>
    )
}