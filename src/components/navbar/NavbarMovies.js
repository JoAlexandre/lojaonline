import { useState } from "react";
import {Navbar, Container, Form, Modal, Button, NavLink} from "react-bootstrap";
import './Navbar.scss'
import RightBar from "./RightBar";

import { useContext } from 'react'
import { ContextVariables } from '../App'
import { Link } from "react-router-dom";


export default function NavbarMovies(){

  const {context, setContext} = useContext(ContextVariables)

  const [carrinho, setCarrinho] = useState({
    showCarrinho: false,
    aba:''
  })

  const [favorito, setFavorito] = useState({
    showFavorito: false,
    aba:''
  })

  

  const onClickCarrinho = (e) =>{
    setCarrinho({
      ...carrinho
      , showCarrinho: !carrinho.showCarrinho
      , aba: 'carrinho'})

    setFavorito({
      ...favorito
      , showFavorito: false
      , aba: 'favorito'})

  }
  
  const onClickFavoritos = (e) =>{
    setCarrinho({
      ...carrinho
      , showCarrinho: false
      , data: context.carrinho
      , aba: 'carrinho'})
    setFavorito({
      ...favorito
      , showFavorito: !favorito.showFavorito
      , data: context.favorito
      , aba: 'favorito'})
      // console.log(favorito);
  }

  const onChangeInput = (e) => {
    e.preventDefault()
    setContext(lastData => ({...lastData, buscarFilmes: e.target.value}))
  }

  return(
    <>
      <Navbar expand="lg" className="navbar-style" sticky="top">
        <Container className='navbar'>
        <Button variant="primary" className="navbar-brand">
                    <Link to='/'>
                        LOGO
                    </Link>
                </Button>
          {/* <h5 className="navbar-brand">LOGO</h5> */}
          <Form className="d-flex" method="dialog">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search"
              aria-label="Search"
              onChange={onChangeInput}
            />
          </Form>
          <div>
            <button className="btn-navbar" onClick={onClickFavoritos}>
                <div className="d-flex">
                  <i className="bi bi-heart-fill"></i>
                </div>
            </button>
            <button className="btn-navbar" onClick={onClickCarrinho}>
              <i className="bi bi-cart"></i>
              {
                context.carrinho.length ? <span className="totalCarrinho">{context.carrinho.length}</span> : ''
              }
              </button>
          </div>
        </Container>
        {
          carrinho.showCarrinho ? 
          <RightBar {...carrinho} />
          :
          <RightBar {...carrinho} />
        }
        {
          favorito.showFavorito ? 
          <RightBar {...favorito} />
          :
          <RightBar {...favorito} />
        }
      </Navbar>
      
    </>
  )
}

