import { useState, useEffect } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import api from "../../services/api"
import { CidadeInterface } from "../cidades/ListCidades"
import { TipoInterface } from "../tipos/ListTipos"

const UpdatePessoa = () => {

    const [nome,setNome] = useState('')
    const [rua,setRua] = useState('')
    const [numero,setNumero] = useState('')
    const [complemento,setComplemento] = useState('')
    const [rg,setRg] = useState('')
    const [cidadeId,setCidadeId] = useState(0)
    const [cidades, setCidades] = useState<CidadeInterface[]>([])
    const [tipoId,setTipoId] = useState(0)
    const [tipos, setTipos] = useState<TipoInterface[]>([])
    const {id} = useParams()

    useEffect(() => {

        api.get('/cidades')
            .then(response =>{
            setCidades(response.data)
        })

    },[])

    useEffect(() => {

        api.get('/tipos')
            .then(response =>{
            setTipos(response.data)
        })

    },[])

    useEffect(() => {

        api.get(`/pessoas/${id}`)
            .then(response =>{
            setNome(response.data.nome)
            setRua(response.data.rua)
            setNumero(response.data.numero)
            setComplemento(response.data.complemento)
            setCidadeId(response.data.cidadeId)
            setTipoId(response.data.tipoId)

        })
    })

    const navigate = useNavigate()

    const handleUpdatePessoa = async (event : React.FormEvent<HTMLFormElement>) => {

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
            await api.put('/pessoas', data)
            alert("Pessoa atualizada com sucesso!")
            navigate('/pessoas')

        } catch (error) {
            console.error(error)
            alert("Erro na atualização da Pessoa!")
        }

    }
    
    return(

        <div>

            <h3>Atualizar pessoas: {nome}</h3>

            <form onSubmit={handleUpdatePessoa}>

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

                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>

            </form>

        </div>
    )

}

export default UpdatePessoa