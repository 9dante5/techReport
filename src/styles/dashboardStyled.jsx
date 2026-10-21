import styled from "styled-components";
import { bold, familyFont1, familyFont2, firstColor, regular, secondColor, secondColorRGB, textColor, thirdColor, thirdColorRGB } from "../helpers/stylesheet";

export const ContainerDashboard = styled.div`
width: 100%;
min-height: 100vh;
background-color: ${firstColor};
display: flex;
flex-direction: column;
`

export const NavbartDashboard = styled.div`
width: 100%;
height: fit-content;
background-color: rgba(${thirdColorRGB[0]}, ${thirdColorRGB[0]}, ${thirdColorRGB[0]}, .6);
display: flex;
flex-direction: column;
`

export const SaludoNavbart = styled.div`
width: 100%;
height: fit-content;
align-items: center;
padding: 15px 30px; 
box-sizing: border-box;
`

export const TextSaludo = styled.h3`
font-size: 18px;
font-family: ${familyFont2};
font-weight: ${bold};
color: ${secondColor}; 
user-select: none
`

export const SesionesNavbart = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 5px 30px 30px;
box-sizing: border-box;
`

export const NombreSesiones = styled.h2`
font-size: 16px;
font-family: ${familyFont1};
font-weight: ${regular};
color: ${textColor};
user-select: none;
cursor: pointer;

&&:hover {
color: rgba(${secondColorRGB[0]}, ${secondColorRGB[1]}, ${secondColorRGB[2]}, .5);
font-size: 15px;
font-weight: ${bold};
}
`