import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom"
import { PessoaInterface } from "../pessoas/ListPessoas"
import { LocalInterface } from "../locais/ListLocais"

export interface DoacaoInterface {
    id: number
    pessoaId: PessoaInterface
    localId: LocalInterface
    data: Date
}

const ListDoacoes = () => {

    const [doacoes, setDoacoes] = useState<DoacaoInterface[]>([]);

    useEffect(() => {

        api.get('/doacoes')
            .then(response =>{
            setDoacoes(response.data)
        })

    },[])

    const handleDeleteDoacoes = async (id : number) => {

        if(!window.confirm("Confirma exclusão da doação?")){
            return
        }

        try {
            
            await api.delete('/doacoes', {
                data:{
                    id
                }
            })

            alert("Doação excluída com sucesso!")

            //Atualizar?

            setDoacoes(doacoes.filter(doacao => doacao.id != id))

        } catch (error) {
            
            alert("Erro na exclusão da Cidade!")
            console.error(error)

        }

    }

    return(

        <div> 
            <h3>Lista de doações</h3>
            <div>
                <Link to='/doacao/create'>Inserir</Link>
            </div>
            
            <div>
                <Link to='/'>Voltar</Link>
            </div>
            
            <table border={1} style={{border: '1px solid white'}}>

                <thead>
                    <tr>
                        <th >Id</th>
                        <th>Pessoa</th>
                        <th>Local</th>
                    </tr>
                </thead>

                <tbody>

                {
                
                    doacoes.map(doacao => (
                        <tr >
                            <td>{doacao.id}</td>
                            {/* <td>{doacao.pessoaId.nome}</td>
                            <td>{doacao.localId.nome}</td>
                            <td>{doacao.data.getTime()}</td> */}
                            <td><Link  to={`/locais/update/${doacao.id}`}>Atualizar</Link></td>
                            <td><button onClick={ () => {handleDeleteDoacoes(doacao.id)}}>Excluir</button></td>
                        </tr>

                    ))
                }

                </tbody>

            </table>
        </div>
    )

}

export default ListDoacoes