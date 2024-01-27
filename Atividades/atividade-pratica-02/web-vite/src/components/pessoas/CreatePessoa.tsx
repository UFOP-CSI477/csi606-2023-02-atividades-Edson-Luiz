import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import api from "../../services/api"
import { CidadeInterface } from "../cidades/ListCidades"
import { TipoInterface } from "../tipos/ListTipos"

const CreatePessoa = () => {

    const [nome,setNome] = useState('')
    const [rua,setRua] = useState('')
    const [numero,setNumero] = useState('')
    const [complemento,setComplemento] = useState('')
    const [rg,setRg] = useState('')
    const [cidadeId,setCidadeId] = useState(0)
    const [cidades, setCidades] = useState<CidadeInterface[]>([])
    const [tipoId,setTipoId] = useState(0)
    const [tipos, setTipos] = useState<TipoInterface[]>([])

    useEffect(() => {

        api.get('/cidades')
            .then(response =>{
            setCidades(response.data)
        })

        api.get('/tipos')
            .then(response =>{
            setTipos(response.data)
        })

    },[])

    const navigate = useNavigate()

    const handleNewPessoa = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const data = {

            nome,
            rua,
            numero,
            complemento,
            rg,
            cidadeId: cidadeId,
            tipoId: tipoId

        }

        try {
            await api.post('/pessoas', data)
            alert("Pessoa inserida com sucesso!")
            navigate('/pessoas')

        } catch (error) {
            console.error(error)
            alert("Erro na inserção da Pessoa!")
        }

    }
    
    return(

        <div>

            <h3>Cadastro de pessoa: {nome}</h3>

            <form onSubmit={handleNewPessoa}>

                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" value={nome} 
                    onChange={e => setNome(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="rua">Rua</label>
                    <input type="text" name="rua" id="rua" value={rua} 
                    onChange={e => setRua(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="numero">Numero</label>
                    <input type="text" name="numero" id="numero" value={numero} 
                    onChange={e => setNumero(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="complemento">Complemento</label>
                    <input type="text" name="complemento" id="complemento" value={complemento} 
                    onChange={e => setComplemento(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="rg">RG</label>
                    <input type="text" name="rg" id="rg" value={rg} 
                    onChange={e => setRg(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="cidadeId">Cidade</label>
                    <select name="cidadeId" id="cidadeId" onChange={e => setCidadeId(parseInt(e.target.value))}>

                        <option value="0" selected>Selecione:</option>

                        {
                            cidades.map(cidade => (
                                <option value={cidade.id}>{cidade.nome}</option>
                            ))
                        }

                    </select>
                </div>

                <div>
                    <label htmlFor="tipoId">Tipo</label>
                    <select name="tipoId" id="tipoId" onChange={e => setTipoId(parseInt(e.target.value))}>

                        <option value="0" selected>Selecione:</option>

                        {
                            tipos.map(tipo => (
                                <option value={tipo.id}>{tipo.tipo} - {tipo.fator}</option>
                            ))
                        }

                    </select>
                </div>

                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>

            </form>

        </div>
    )

}

export default CreatePessoa