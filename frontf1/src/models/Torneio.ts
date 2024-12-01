import {Piloto} from "./Piloto";
import {Equipe} from "./Equipe";

export interface Torneio{
    
    id: number;
    ano: string;
    numCorridas: number;
    vencedorID: number;
    vencedor: Piloto;
    equipeVencedoraID: number;
    equipeVencedora: Equipe;
    
}