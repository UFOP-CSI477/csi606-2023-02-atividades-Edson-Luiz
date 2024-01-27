import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom"

export interface TipoInterface {
    id: number
    tipo: string
    fator: string
}

const ListTipos = () => {

    const [tipos, setTipos] = useState<TipoInterface[]>([]);

    useEffect(() => {

        api.get('/tipos')
            .then(response =>{
            setTipos(response.data)
        })

    },[])

    return(

        <div> 
            <h3>Lista de tipos</h3>
            <div>
                <Link to='/tipos/create'>Inserir</Link>
            </div>
            
            <div>
                <Link to='/'>Voltar</Link>
            </div>
            
            <table border={1} style={{border: '1px solid white'}}>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tipo</th>
                        <th>Fator</th>
                    </tr>
                </thead>

                <tbody>

                {
                
                    tipos.map(tipo => (
                        <tr>
                            <td>{tipo.id}</td>
                            <td>{tipo.tipo}</td>
                            <td>{tipo.fator}</td>
                        </tr>

                    ))
                }

                </tbody>

            </table>
        </div>
    )

}

export default ListTipos