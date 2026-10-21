import { NumerosALetras } from 'numero-a-letras';

export const NumLett = (numb) => {

    let letter = NumerosALetras(Number(numb))

    while (letter.slice(-1) != "s") {
        letter = letter.slice(0, -1)
    }

    return letter
}