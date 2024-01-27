import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom"
import { CidadeInterface } from "../cidades/ListCidades"

export interface LocalInterface {
    id: number
    nome: string
    numero: string
    rua: string
    complemento: string
    createdAt: string
    updatedAt: string
    cidadeId: CidadeInterface
}

const ListLocais = () => {

    const [locais, setLocais] = useState<LocalInterface[]>([]);

    useEffect(() => {

        api.get('/locais')
            .then(response =>{
            setLocais(response.data)
        })

    },[])

    const handleDeleteLocal = async (id : number) => {

        if(!window.confirm("Confirma exclusão do estado?")){
            return
        }

        try {
            
            await api.delete('/locais', {
                data:{
                    id
                }
            })

            alert("Cidade excluída com sucesso!")

            //Atualizar?

            setLocais(locais.filter(local => local.id != id))

        } catch (error) {
            
            alert("Erro na exclusão da Cidade!")
            console.error(error)

        }

    }

    return(

        <div> 
            <h3>Lista de locais de coleta</h3>
            <div>
                <Link to='/locais/create'>Inserir</Link>
            </div>
            
            <div>
                <Link to='/'>Voltar</Link>
            </div>
            
            <table border={1} style={{border: '1px solid white'}}>

                <thead>
                    <tr>
                        <th >Id</th>
                        <th>Nome</th>
                        <th>Numero</th>
                        <th>Rua</th>
                        <th>Complemetno</th>
                        <th>Cidade</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                <tbody>

                {
                
                    locais.map(local => (
                        <tr >
                            <td>{local.id}</td>
                            <td>{local.nome}</td>
                            <td>{local.numero}</td>
                            <td>{local.rua}</td>
                            <td>{local.complemento}</td>
                            <td>{local.cidadeId.nome}</td>
                            <td><Link  to={`/locais/update/${local.id}`}>Atualizar</Link></td>
                            <td><button onClick={ () => {handleDeleteLocal(local.id)}}>Excluir</button></td>
                        </tr>

                    ))
                }

                </tbody>

            </table>
        </div>
    )

}

export default ListLocais