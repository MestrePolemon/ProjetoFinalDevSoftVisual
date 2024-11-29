import {Piloto} from "./Piloto";

export interface Torneio{
    
    id: number;
    ano: string;
    numCorridas: number;
    vencedorID: number;
    vencedor: Piloto;
    equipeVencedoraID: number;
    equipeVencedora: string;
    
}