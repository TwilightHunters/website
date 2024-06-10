// Interface to defining our obkect of response functions
export interface ResponseFunctions {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}

// Interface to define User model on the frontend
export interface User {
    _id?: string
    username: string
    email: string
    password: string
}

// Interface to define Recipe model on the frontend
export interface Recipe {
    _id?: string
    name: string
    author: string
    ingredients: Array<String>
    instructions: Array<String>
    image: string
    rating: number
    prep_time: string
    cook_time: string
    total_time: string
    servings: number
    nutrition: {
        calories: number
        fat: number
        carbs: number
        protein: number
    }
}

// Interface to define Author model on the frontend
export interface Author {
    _id?: string
    name: string
    email: string
}
