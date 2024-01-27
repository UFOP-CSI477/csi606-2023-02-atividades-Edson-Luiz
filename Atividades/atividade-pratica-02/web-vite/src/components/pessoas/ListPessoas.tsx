import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom"
import { CidadeInterface } from "../cidades/ListCidades"

export interface PessoaInterface {
    id: number
    nome: string
    rua: string
    numero: string
    complemento: string
    rg: string
    cidadeId: CidadeInterface
}

const ListPessoas = () => {

    const [pessoas, setPessoas] = useState<PessoaInterface[]>([]);

    useEffect(() => {

        api.get('/pessoas')
            .then(response =>{
            setPessoas(response.data)
        })

    },[])

    const handleDeletePessoa = async (id : number) => {

        if(!window.confirm("Confirma exclusão da pessoa?")){
            return
        }

        try {
            
            await api.delete('/pessoas', {
                data:{
                    id
                }
            })

            alert("Pessoa excluída com sucesso!")

            //Atualizar?

            setPessoas(pessoas.filter(pessoa => pessoa.id != id))

        } catch (error) {
            
            alert("Erro na exclusão da Pessoa!")
            console.error(error)

        }

    }

    return(

        <div> 
            <h3>Lista de pessoas</h3>
            <div>
                <Link to='/pessoas/create'>Inserir</Link>
            </div>
            
            <div>
                <Link to='/'>Voltar</Link>
            </div>
            
            <table border={1} style={{border: '1px solid white'}}>

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Rua</th>
                        <th>Numero</th>
                        <th>Complemento</th>
                        <th>RG</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>

                <tbody>

                {
                
                    pessoas.map(pessoa => (
                        <tr >
                            <td>{pessoa.id}</td>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.rua}</td>
                            <td>{pessoa.numero}</td>
                            <td>{pessoa.complemento}</td>
                            <td>{pessoa.rg}</td>
                            <td><Link  to={`/pessoas/update/${pessoa.id}`}>Atualizar</Link></td>
                            <td><button onClick={ () => {handleDeletePessoa(pessoa.id)}}>Excluir</button></td>
                        </tr>

                    ))
                }

                </tbody>

            </table>
        </div>
    )

}

export default ListPessoas