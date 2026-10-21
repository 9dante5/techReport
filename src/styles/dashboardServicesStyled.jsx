import styled from "styled-components";
import { bold, extraBold, familyFont1, familyFont2, light, medium, regular, secondColor, secondColorRGB, semiBold, textColor, textColorRGB, thirdColor, thirdColorRGB } from "../helpers/stylesheet";

export const ContainerDashboardServices = styled.div`
width: 100%
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-contenet: start;
gap: 30px;
padding: 0 0 50px 0;
`

export const ContainerFormServices = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 10px;
box-sizing: border-box;
gap: 20px;
`

export const TitleFormServices = styled.h2`
font-family: ${familyFont1};
font-size: 16px;
font-weight: ${bold};
color: ${textColor};
`

export const FormServices = styled.form`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
`

export const ContainerInputFormServices = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 20px;
flex-wrap: wrap;
`

export const LabelFormServices = styled.label`
display: flex;
flex-direction: column;
align-items: center;
text-align: left;
gap: 5px;
color: ${textColor};
font-family: ${familyFont2};
font-size: 14px;
font-weight: ${semiBold};

@media (min-width: 1000px) {
    width: 22%;
}

@media (min-width: 550px) and (max-width: 1000px) {
    width: 45%;
}

@media (max-width: 550px) {
    width: 100%;
}
`

export const InputFormServices = styled.input`
max-width: 220px;
height: 25px;
border: 0;
border-radius: 5px;
background-color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, .7);
padding: 5px 12px;
box-sizing: border-box;
font-size: 14px;
font-family: ${familyFont2};
font-weight: ${light};

&&[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
-webkit-appearance: none; 
margin: 0; 
}

&&[type=number] { -moz-appearance:textfield; }
`

export const ButtonFormServices = styled.button`
width: 150px;
height: 50px;
border: 0;
border-radius: 20px;
background-color: ${thirdColor};
color: ${textColor};
font-size: 15px;
font-family: ${familyFont1};
font-weight: ${bold};
box-shadow: 0 0 15px rgba(${secondColorRGB[0]}, ${secondColorRGB[1]}, ${secondColorRGB[2]}, .5);
cursor: pointer;
`

export const TitleServices = styled.h2`
font-family: ${familyFont1};
font-size: 20px;
font-weight: ${bold};
color: ${textColor};
`

export const ContainerCardsServices = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 10px;
padding: 0 10px;
box-sizing: border-box;
`

export const CardServices = styled.div`
width: 320px;
height: fit-content;
background-color: rgba(${secondColorRGB[0]}, ${secondColorRGB[1]}, ${secondColorRGB[2]}, .3);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
padding: 15px 5px;
box-sizing: border-box;
border-radius: 10px;
`

export const TitleCardServices = styled.h1`
font-family: ${familyFont1};
font-size: 18px;
font-weight: ${bold};
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, .9);
text-align: center;
`

export const ListUlCardServices = styled.ul`
width: 85%;
display: flex;
flex-direction: column;
gap: 5px;
list-style-type: disc;
`

export const ListLiCardServices = styled.li`
font-family: ${familyFont2};
font-size: 14px;
font-weight: ${bold};
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, .9);
`

export const ContainerOptionsCardServices = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
`

export const OptionCardServices = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
font-size: 24px;
color: ${textColor};

&& > * {
cursor: pointer;
}
`