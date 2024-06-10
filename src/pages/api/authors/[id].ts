// GET API request sample: http://localhost:3000/api/authors/id

import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { ResponseFunctions } from "../../../utils/types"; // import type for function key below

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // capture request method, we type it as a key of ResponseFunction to reduce typing later
    const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;

    // functions for catch errors
    const catcher = (error: Error) => res.status(400).send({ error })

    // grab id from req.query () (where next stores params)
    const id: string = req.query.id as string

    // potential responses for /authors/:id
    const handleCase: ResponseFunctions = {
        // response for get requests
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Author } = await connect() // connect to database
            res.json(await Author.findById(id).catch(catcher));
        },
        // response for post requests
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Author } = await connect() // connect to database
            res.json(
                await Author.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
            );
        },
        // response for delete requests
        DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Author } = await connect() // connect to database
            res.json(await Author.findByIdAndDelete(id).catch(catcher));
        },
    }

    // check if there a response for the particular method, is so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler; 