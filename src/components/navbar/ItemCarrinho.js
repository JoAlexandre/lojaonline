import { useContext } from "react"
import { ContextVariables } from "../App"
export default function ItemCarrinho({movieName, movieQtd, moviePrice, movieImg, classN}){
    const {setContext} = useContext(ContextVariables)
    
    const onRemove = (e, movieName) => {
        e.preventDefault()
        setContext(lastData => ({...lastData, carrinho: lastData.carrinho.filter(item => item.movieName !== movieName)}))
    } 
    return(
        <div className={classN}>
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
            <span className='qtd'>
                {movieQtd}

            </span>
            <span className='lixeira' title='Remover'>
                <button className='btn-right-bar' onClick={e => onRemove(e, movieName)}>
                    <i className="bi bi-trash-fill"></i>
                </button>    

            </span>
        </div>
    )
}