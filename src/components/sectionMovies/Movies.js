import { ContextVariables } from "../App"
import {  useLayoutEffect, useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { CardMovie } from "../card/CardMovie";
import { PageTemplate } from "../Template/PageTemplate";
const mes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro' ]


export function Movies(){
    const [reload, setReload] = useState('')
    const [movieData, setMovieData] = useState([])
    const {context, setContext} = useContext(ContextVariables)

    useLayoutEffect(()=> {
        if(reload.match('reload')){
            for (let index = movieData.length; index < movieData.length + 50; index++) {
                fetch(`https://api.themoviedb.org/3/movie/${index}?api_key=750a2e176439c31e71763acb8351cdd2`)
                .then(res => res.json())
                .then(res => {
                
                if(!res.budget){
                    return
                } 
                
                const arrayValue = res.budget.toString().split('')
                const precoFormatado = Number(`${arrayValue[0]}${arrayValue[1]}.${arrayValue[2]}`).toFixed(2)
                const data = new Date(res.release_date)
                const dataFormatada = `${data.getDate()} de ${mes[data.getMonth()]}, ${data.getFullYear()}`
                setMovieData(oldArray => 
                    [
                        ...oldArray
                        , oldArray.findIndex(item => {
                            return  item.movieName === res.title
                        }) === -1 ?
                        {
                            movieImg: `https://image.tmdb.org/t/p/original${res.poster_path}`
                            , movieName: res.title
                            , moviePrice: precoFormatado
                            , movieData: dataFormatada
                            , movieRate: res.vote_average
                            , movieGender: res.genres.map((item, index) => index === 0 ? item.name : "")
                            , hidden: false
                        } : 
                        /* 
                            esses filmes adicionados são duplicados, entao
                            setei eles parar sempre sumir da UI e um nome vazio para não dar erro na aplicação
                         
                         , */
                        {
                            hidden:true,
                            movieName: 'null'
                        }
                    ])
                    
            }).catch(e => console.log(e))
            }
        return
        } else if( reload.match('wait')){
            return
        }
        for (let index = movieData.length; index < movieData.length + 50; index++) {
            fetch(`https://api.themoviedb.org/3/movie/${index}?api_key=750a2e176439c31e71763acb8351cdd2`)
            .then(res => res.json())
            .then(res => {
            
            if(!res.budget){
                return
            } 
            
            const arrayValue = res.budget.toString().split('')
            const precoFormatado = Number(`${arrayValue[0]}${arrayValue[1]}.${arrayValue[2]}`).toFixed(2)
            const data = new Date(res.release_date)
            const dataFormatada = `${data.getDate()} de ${mes[data.getMonth()]}, ${data.getFullYear()}`
            setMovieData(oldArray => 
                [
                    ...oldArray
                    , 
                    {
                        movieImg: `https://image.tmdb.org/t/p/original${res.poster_path}`
                        , movieName: res.title
                        , moviePrice: precoFormatado
                        , movieData: dataFormatada
                        , movieRate: res.vote_average
                        , movieGender: res.genres.map((item, index) => index === 0 ? item.name : "")
                        , hidden: false
                    }
                ])
        }).catch(e => console.log(e))
        }
    },[reload])

    useEffect(()=>{
        if(context.buscarFilmes){
            setMovieData(
                // eslint-disable-next-line array-callback-return
                movieData.map(item => {
                    if(item.movieName.toLowerCase().startsWith(context.buscarFilmes.toLowerCase())) {
                        item.hidden = false
                    }else{
                        item.hidden = true
                    }
                    return item
                })
            ) 
            return
        } else{
            setMovieData(movieData.map(item => {
                item.movieName !== 'null' ? item.hidden = false : item.hidden = true 
                return item
            }))
        }

        const handleScroll = event => {
            const reloadIng = window.document.body.scrollHeight - window.scrollY < 670 ? setReload('reload') : setReload('wait')
        };
      
        window.addEventListener('scroll', handleScroll);
    
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    },[context])


    return (
        <Row className='mx-auto' id="teste">
        {
            movieData.map((item, index) => 
            <Col sm={6} md={4} lg={3} key={index} className='colunaRows' hidden={item.hidden}>
                <CardMovie {...item}/>
            </Col>
            )
        }
        </Row>
    )
    
}