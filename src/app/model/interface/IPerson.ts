import { IPlanet } from "./IPlanet"
import { IStarship } from "./IStarship"

export interface IPerson {
    id: number,
    name: string,
    height: number,
    birthYear: string,
    homeworldId: number,
    homeworld?: IPlanet,
    starshipsIds: number[]
    starships: IStarship[]
}