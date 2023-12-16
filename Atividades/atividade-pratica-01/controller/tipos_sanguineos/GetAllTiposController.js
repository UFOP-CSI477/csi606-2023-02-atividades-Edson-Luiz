import { prisma } from "../../src/database/client.js";

export class GetAllTiposController{

    async handle(request, response){

        const tiposSanguineos = await prisma.tiposSanguineos.findMany()
        return response.json(tiposSanguineos)

    }

}