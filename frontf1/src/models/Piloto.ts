import { Equipe } from './Equipe';

export interface Piloto{
    id: number;
    nome: string;
    nacionalidade: string;
    equipe?: Equipe
    equipeId: number;
}