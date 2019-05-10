import { Stat } from './stat';

export class Pokemon {
    id: number;
    name: string;
    stats: Stat[];
    type: string[];
    abilities: string[];
    description:string;
    images:string[];

    constructor()
    constructor(id?: number, name?: string)
    constructor(id?: number, name?: string, stats?: Stat[], type?: string[], abilities?: string[], description?:string,images?:string[]) {
        this.id = id;
        this.name = name;
        this.stats = stats;
        this.type = type;
        this.abilities = abilities;
        this.description = description;
        this.images = images;
    }
}