import styled from "styled-components";
import { extraLight, familyFont1, familyFont2, firstColor, light, regular, secondColor, secondColorRGB, textColor, textColorRGB, thirdColor } from "../helpers/stylesheet";

export const ContainerLogin = styled.div`
width: 100%;
height: 100vh;
background-color: ${firstColor};
display: flex;
align-items: center;
justify-content: center;
`

export const ContainerFormLogin = styled.div`
width: 350px;
height: 400px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: start;
gap: 10px;
padding: 20px;
box-sizing: border-box;
border: 1px, solid, rgba(${secondColorRGB[0]}, ${secondColorRGB[1]}, ${secondColorRGB[2]}, .5);
border-radius: 20px 80px;
box-shadow: 0 0 20px ${secondColor};
`

export const ImgLogin = styled.img`
width: 150px;
height: auto
`

export const FormLogin = styled.form`
width: 80%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 15px;
`

export const InputFormLogin = styled.input`
width: 100%;
height: 40px;
padding: 5px 20px;
box-sizing: border-box;
background-color: ${thirdColor};
border-radius: 10px;
box-shadow: inset 0 0 5px ${textColor};
border: none;
outline: none;
color: ${textColor};
font-size: 18px;
font-family: ${familyFont1};
font-weight: ${light};

&&::placeholder {
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, .6)
font-weight: ${extraLight};
}

&&:focus {
box-shadow: 0 0 5px ${textColor};
}
`

export const ButtonFormLogin = styled.button`
width: fit-content;
height: fit-content;
padding: 10px;
box-sizing: border-box;
background-color: ${thirdColor};
border-radius: 10px;
box-shadow: -1px 1px ${textColor};
border: none;
outline: none;
color: ${textColor};
font-size: 15px;
font-family: ${familyFont1};
font-weight: ${light};

&&:hover {
color: ${textColor};
transform: translate(-3px, 3px);
box-shadow: none;

transition-property: transform, box-shadow;
transition-duration: .4s
}
`