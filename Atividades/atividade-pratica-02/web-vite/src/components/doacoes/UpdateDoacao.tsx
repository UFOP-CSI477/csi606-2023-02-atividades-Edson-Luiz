import { useState, useEffect } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import api from "../../services/api"
import { PessoaInterface } from "../pessoas/ListPessoas"
import { LocalInterface } from "../locais/ListLocais"

const UpdateDoacao = () => {

    const [pessoaId,setPessoaId] = useState(0)
    const [pessoas, setPessoas] = useState<PessoaInterface[]>([])
    const [localId,setLocalId] = useState(0)
    const [locais, setLocais] = useState<LocalInterface[]>([])
    const [data,setData] = useState('')
    const {id} = useParams()

    useEffect(() => {

        api.get('/pessoas')
            .then(response =>{
            setPessoas(response.data)
            
        })

        api.get('/locais')
            .then(response =>{
                setLocais(response.data)
            })

    },[])

    useEffect(() => {

        api.get(`/doacoes/${id}`)
            .then(response =>{
                setPessoas(response.data.pessoas)
                setLocais(response.data.locais)

        })
    })

    const navigate = useNavigate()

    const handleUpdateDoacao = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const data = {

            pessoaId: pessoaId,
            localId: localId,
            data: Date
    
        }

        try {
            await api.put('/doacoes', data)
            alert("Doação atualizada com sucesso!")
            navigate('/doacoes')

        } catch (error) {
            console.error(error)
            alert("Erro na atualização da Doação!")
        }

    }
    
    return(

        <div>

            <h3>Cadastro de local de coleta: {pessoaId}</h3>

            <form onSubmit={handleUpdateDoacao}>

                <div>
                    <label htmlFor="pessoaId">Pessoa</label>
                    <select name="pessoaId" id="pessoaId" onChange={e => setPessoaId(parseInt(e.target.value))}>

                        <option value="0" selected>Selecione:</option>

                        {
                            pessoas.map(pessoa => (
                                <option value={pessoa.id}>{pessoa.nome}</option>
                            ))
                        }

                    </select>
                </div>

                <div>
                    <label htmlFor="localId">Local</label>
                    <select name="localId" id="localId" onChange={e => setLocalId(parseInt(e.target.value))}>

                        <option value="0" selected>Selecione:</option>

                        {
                            locais.map(local => (
                                <option value={local.id}>{local.nome}</option>
                            ))
                        }

                    </select>
                </div>

                <div>
                    <label htmlFor="data">Data</label>
                    <input type="date" name="data" id="data" value={data} 
                    onChange={e => setData(e.target.value)}/>
                </div>


                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>

            </form>

        </div>
    )

}

export default UpdateDoacao