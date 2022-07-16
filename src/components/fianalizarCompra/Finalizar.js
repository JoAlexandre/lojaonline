/* eslint-disable no-unused-expressions */
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { ContextVariables } from "../App";
import ItemCarrinho from "../navbar/ItemCarrinho";
import TotalPrice from "../navbar/TotalPrice";
import './Finalizar.scss'

export function FinalizarCompra(){

    const [cliente, setCliente] = useState({
        nome:'',
        cpf:'',
        email:'',
        celular:'',
        cep:'',
        endereco:'',
        cidade:'',
        estado:'',
    })
    const [errors, setErrors] = useState({
        cpf:false,
        celular:false,
        cep:false,
    })
    const [modal, setModal] = useState({
        title:'',
        error: false,
        show: false

    })
    const {context} = useContext(ContextVariables)

    const onChangeHandler = (e) => {
        setCliente(lastData => 
            (
                {
                    ...lastData, 
                    [e.target.name]: 
                    e.target.value
                }
            )
        )
    }

    const onBlur = (e) => {
        /* RETORNAR SE NADA FOR INSERIDO */
        if(!e.target.value.length){
            setErrors(lastErrors => 
                ({  
                    ...lastErrors, 
                    [e.target.name]: false
                })
            )
            return
        }


        /* TRATAMENTO DE ERROS DE INPUT */
        /* CPF */
        if(e.target.name.match('cpf')){
            /* CASO A PESSOA TENHA DIGITADO TUDO CERTO JA COM PONTOS E TRAÇO */
            if( e.target.value.charAt(3).match('.') && e.target.value.charAt(7).match('.') && e.target.value.charAt(11).match('-')
            ){
                if(e.target.value.replaceAll('.','').replaceAll('-','').match(/\D/g) || e.target.value.replaceAll('.','').replaceAll('-','').length !== 11){
                    setErrors(lastErrors => 
                        ({  
                            ...lastErrors, 
                            [e.target.name]: true
                        })
                    )
                    setCliente({...cliente, [e.target.name]: ''})
                }else{
                    setErrors(lastErrors => 
                        ({  
                            ...lastErrors, 
                            [e.target.name]: false
                        })
                    )

                }
                return
            }

            const cpfEditado = e.target.value.length === 11 ? 
            `${e.target.value.substring(0,3)}.${e.target.value.substring(3,6)}.${e.target.value.substring(6,9)}-${e.target.value.substring(9,11)}`
            : ''
            
            /* SE A PESSOA DIGITAR SOMENTE OS NUMEROS, EXCETO PONTOS E TRAÇO */
            e.target.value.length === 11 && !e.target.value.match(/\D/g)? 
            setErrors(lastErrors => 
                ({  
                    ...lastErrors, 
                    [e.target.name]: false
                })
            )
            :
            setErrors(lastErrors => 
                ({
                    ...lastErrors, 
                    [e.target.name]: true
                })
            )
            setCliente({...cliente, [e.target.name]: cpfEditado})
            return 
        }
        /* CELULAR */
        if(e.target.name.match('celular')){

            if( e.target.value.charAt(0).match(/\(/) && e.target.value.charAt(3).match(/\)/) && e.target.value.charAt(9).match('-')
            ){
                const digitos = e.target.value.replaceAll('(','').replaceAll(')','').replaceAll('-','')
                console.log(digitos.match(/\D/g));
                if(digitos.match(/\D/g) || digitos.length !== 11){
                    setErrors(lastErrors => 
                        ({  
                            ...lastErrors, 
                            [e.target.name]: true
                        })
                    )
                }else{
                    setErrors(lastErrors => 
                        ({  
                            ...lastErrors, 
                            [e.target.name]: false
                        })
                    )

                }
                return
            }
            
            const numeroEditado = e.target.value.length === 11 ? 
            `(${e.target.value.substring(0,2)})${e.target.value.substring(2,7)}-${e.target.value.substring(7,11)}`
            : ''
            
            /* SE A PESSOA DIGITAR SOMENTE OS NUMEROS, EXCETO PONTOS E TRAÇO */
            e.target.value.length === 11 && !e.target.value.match(/\D/g)? 
            setErrors(lastErrors => 
                ({  
                    ...lastErrors, 
                    [e.target.name]: false
                })
            )
            :
            setErrors(lastErrors => 
                ({
                    ...lastErrors, 
                    [e.target.name]: true
                })
            )
            setCliente({...cliente, [e.target.name]: numeroEditado})
            return 
        }
        /* CEP */
        if(e.target.name.match('cep')){

            if(e.target.value.charAt(5).match('-')  && !e.target.value.replace('-','').match(/\D/g) ){
                if(e.target.value.replace('-','').length === 8){
                    setErrors(lastErrors => 
                        ({  
                            ...lastErrors, 
                            [e.target.name]: false
                        })
                    )
                    return
                }
                else{
                    setErrors(lastErrors => 
                        ({  
                            ...lastErrors, 
                            [e.target.name]: true
                        })
                    )
                    setCliente({...cliente, [e.target.name]: ''})
                    return
                }
            }
            
            const cepEditado = e.target.value.length === 8 ? 
            `${e.target.value.substring(0,5)}-${e.target.value.substring(5,8)}`
            : ''
            
            /* SE A PESSOA DIGITAR SOMENTE OS NUMEROS, EXCETO PONTOS E TRAÇO */
            e.target.value.length === 8 && !e.target.value.match(/\D/g)? 
            setErrors(lastErrors => 
                ({  
                    ...lastErrors, 
                    [e.target.name]: false
                })
            )
            :
            setErrors(lastErrors => 
                ({
                    ...lastErrors, 
                    [e.target.name]: true
                })
            )
            setCliente({...cliente, [e.target.name]: cepEditado})
            return 
        }
    }

    const onClickFinalizar = (e) => {
        e.preventDefault()
        if(
            cliente.celular &&
            cliente.cep &&
            cliente.cidade &&
            cliente.cpf &&
            cliente.email &&
            cliente.endereco &&
            cliente.estado &&
            cliente.nome
        ){
            setModal(lastData => ({...lastData, show: true, title: `Obrigado ${cliente.nome}!`,error: false}))
        }else{
            setModal(lastData => ({...lastData, show: true, title: 'Insira todos os dados corretamente no formulário ao lado!', error: true}))

        }
    }

    return (
        <Container>
            <h2 className="my-4">Finalizar Compra</h2>
            <Row>
                <Col sm={12} lg={6}>
                    <Form>
                        <Row className='my-2'>
                            <Col>
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control 
                                required
                                value={cliente.nome}
                                type="text" 
                                name="nome" 
                                placeholder="Nome Completo" 
                                onChange={onChangeHandler}
                                onInput={e=> e.target.value = e.target.value.toUpperCase()}
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm={6}>
                                <Form.Label>CPF:</Form.Label>
                                <Form.Control type='text' 
                                required
                                name="cpf" 
                                placeholder="000.000.000-00" 
                                value={cliente.cpf} 
                                onChange={onChangeHandler}
                                onBlur={onBlur}
                                />
                                {
                                    errors.cpf ?    
                                        <Form.Text className='error-message'>
                                            CPF INVÁLIDO
                                        </Form.Text> 
                                    : 
                                        ""
                                }
                                
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Telefone:</Form.Label>   
                                <Form.Control type='tel' 
                                required
                                name="celular" 
                                placeholder="(99)99999-9999" 
                                value={cliente.celular}
                                onChange={onChangeHandler}
                                onBlur={onBlur}
                                />
                                {
                                    errors.celular ?    
                                        <Form.Text className='error-message'>
                                            NUMERO INVÁLIDO
                                        </Form.Text> 
                                    : 
                                        ""
                                }
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                required
                                type="email" 
                                name="email" 
                                value={cliente.email}
                                placeholder="joaozinho@gmail.com" 
                                onChange={onChangeHandler}
                                onInput={e=> e.target.value = e.target.value.toUpperCase()}
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm={4}>
                                <Form.Label>CEP:</Form.Label>
                                <Form.Control 
                                required
                                type='text' 
                                name="cep" 
                                value={cliente.cep}
                                placeholder="99999-999" 
                                onChange={onChangeHandler}
                                onBlur={onBlur}/>
                                {
                                    errors.cep ?    
                                        <Form.Text className='error-message'>
                                            CEP INVÁLIDO
                                        </Form.Text> 
                                    : 
                                        ""
                                }
                            </Col>
                            <Col sm={8}>
                                <Form.Label>Endereço:</Form.Label>
                                <Form.Control 
                                required
                                type='text' 
                                name="endereco" 
                                value={cliente.endereco}
                                placeholder="Rua xxx, Casa yy, Quadra zz ..." 
                                onChange={onChangeHandler}
                                onInput={e=> e.target.value = e.target.value.toUpperCase()}
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm={6}>
                                <Form.Label>Cidade:</Form.Label>
                                <Form.Control 
                                required
                                type='text' 
                                name="cidade" 
                                value={cliente.cidade}
                                placeholder="São Paulo, Rio de Janeiro ..." 
                                onChange={onChangeHandler}
                                onInput={e=> e.target.value = e.target.value.toUpperCase()}
                                />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control 
                                required
                                type='text' 
                                name="estado" 
                                value={cliente.estado}
                                placeholder="São Paulo, Rio de Janeiro ..." 
                                onChange={onChangeHandler}
                                onInput={e=> e.target.value = e.target.value.toUpperCase()}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Col>  
                <Col sm={12} lg={6}>
                    <Container>
                            <div className="my-grid-2" style={{border:'none'}}>
                                <span>Imagem</span>
                                <span>Nome</span>
                                <span>Preço</span>
                                <span>Qtd</span>
                                <span>Remover</span>
                            </div>
                        <div  className="container-finalizar">
                            {
                                context.carrinho.map((item, index) =>
                                        <ItemCarrinho key={index} {...item} classN='my-grid-2'/>
                                )
                            }
                        </div>
                        <div className="finalizar-compra-cliente">
                            <TotalPrice total={
                                    context.carrinho.reduce((prev, next) => prev + Number(next.moviePrice)
                            ,0)} />
                            
                            <Button variant="primary" onClick={onClickFinalizar}>
                                    Finalizar
                            </Button>

                        </div>
                    </Container>
                </Col>  
            </Row>
            <ModalReposta
            show={modal.show}
            title={modal.title}
            onHide={() => setModal(false)}
            /> 
        </Container>
    )
}

function ModalReposta(props) {
    const onClick= (e) => {
        window.location.replace('/')
    }
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        
        <Modal.Body>
            
            {
                props.error ? 
                <div className="card-fim">
                    <h4 className='text-center mb-3'>
                        {props.title}
                    </h4>
                    <p className='alert text-center'>
                        Sua Compra Foi finalizada com Sucesso!
                    </p>
                    <Button onClick={onClick} className='m-3 text-center'>
                        Ir para loja
                    </Button>
                
                </div>
                : 
                <div className="card-fim">
                    <Modal.Header closeButton>
                        <h4 className='text-center mb-3'>
                            {props.title}
                        </h4>
                    </Modal.Header>                
                </div>
            
            }
        </Modal.Body>
      </Modal>
    );
  }