import { Auth } from "./auth"
import { Favorite } from "./favorite"
import { Products } from "./products"

export const Mutation = {
    ...Products,
    ...Auth,
    ...Favorite
}