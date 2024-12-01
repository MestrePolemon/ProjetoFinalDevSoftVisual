import { Pista } from './Pista';
import {Piloto} from "./Piloto";
export interface Corrida{
    
    id: number;
    nomeEvento: string;
    voltas: number;
    dataEvento: Date;
    pistaID: number;
    pista: Pista;
    vencedorID: number;
    vencedor: Piloto;
    segundoID: number;
    segundo: Piloto;
    terceiroID: number;
    terceiro: Piloto;
}