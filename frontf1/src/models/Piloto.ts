import { Equipe } from './Equipe';

export interface Piloto{
    id: number;
    nome: String;
    nacionalidade: String;
    equipe?: Equipe
    equipeId: number;
}