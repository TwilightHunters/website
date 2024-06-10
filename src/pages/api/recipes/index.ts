import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { ResponseFunctions } from "../../../utils/types"; // import type for function key below

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // capture request method, we type it as a key of ResponseFunction to reduce typing later
    const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;

    // function for catch errors
    const catcher = (error: Error) => res.status(400).send({ error })

    // potential responses
    const handleCase: ResponseFunctions = {
        // response for get requests
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Recipe } = await connect() // connect to database
            res.json(await Recipe.find({}).catch(catcher));
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Recipe } = await connect() // connect to database
            res.json(await Recipe.create(req.body).catch(catcher));
        },
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Recipe } = await connect() // connect to database
            res.json(await Recipe.updateOne(req.body).catch(catcher));
        },
        DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Recipe } = await connect() // connect to database
            res.json(await Recipe.deleteOne(req.body).catch(catcher));
        }
    }

    // check if there is a response for the particular method, is so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler;