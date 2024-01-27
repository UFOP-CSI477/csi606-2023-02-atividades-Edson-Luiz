import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import api from "../../services/api"

const CreateTipo = () => {

    const [tipo,setTipo] = useState('')
    const [fator,setFator] = useState('')
    const navigate = useNavigate()

    const handleNewTipo = async (event : React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const data = {

            tipo,
            fator

        }

        try {
            await api.post('/tipos', data)
            alert("Tipo inserido com sucesso!")
            navigate('/tipos')

        } catch (error) {
            console.error(error)
            alert("Erro na inserção do Tipo!")
        }

    }
    
    return(

        <div>

            <h3>Cadastro de estado: {tipo} - {fator}</h3>

            <form onSubmit={handleNewTipo}>

                <div>
                    <label htmlFor="tipo">Tipo</label>
                    <input type="text" name="tipo" id="tipo" value={tipo} 
                    onChange={e => setTipo(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="fator">fator</label>
                    <input type="text" name="fator" id="fator" value={fator} 
                    onChange={e => setFator(e.target.value)}/>
                </div>

                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>

            </form>

        </div>
    )

}

export default CreateTipo