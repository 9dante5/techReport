import styled from "styled-components";
import { bold, extraBold, familyFont1, familyFont2, firstColor, firstColorRBG, light, medium, regular, secondColor, semiBold, textColor, textColorRGB, textError, thirdColor, thirdColorRGB } from "../helpers/stylesheet";

export const ContainerUsers = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: start;
padding: 20px 10px;
box-sizing: border-box;
gap: 50px;
`

export const ButtonCreateClients = styled.button`
width: 140px;
height: 50px;
background-color: ${thirdColor};
border: none;
color: ${textColor};
font-family: ${familyFont1};
font-size: 14px;
font-weight: ${bold};
border-radius: 10px;
box-shadow: 0 5px 8px ${textColor};
cursor: pointer;
`

export const ContainerCardClients = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 20px;
align-items: center;
justify-content: center;
`

export const CardClients = styled.div`
width: 300px;
min-height: 150px;
background-color: rgba(${thirdColorRGB[0]}, ${thirdColorRGB[1]}, ${thirdColorRGB[2]}, 0.6);
box-shadow: 0 0 15px ${secondColor};
border-radius: 5px;
display: flex;
flex-direction: column;
padding: 5px;
box-sizing: border-box;
gap: 10px;
`

export const ContainerNameDocumentCardClients = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 2px;
`

export const NameCardClients = styled.h1`
font-family: ${familyFont1};
font-size: 16px;
font-weight: ${bold};
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, 0.6);
`

export const DocumentCardClients = styled.span`
font-family: ${familyFont1};
font-size: 14px;
font-weight: ${bold};
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, 0.6);
`

export const ContainerInfoCardClients = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
gap: 2px;
`

export const TitleInfoCardClients = styled.span`
font-family: ${familyFont2};
font-size: 14px;
font-weight: ${semiBold};
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, 0.4);
cursor: default;
user-select: none;
`

export const InfoCardClients = styled.span`
font-family: ${familyFont2};
font-size: 12px;
font-weight: ${light};
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, .9);
`

export const TitleServicesCardClients = styled.h3`
font-family: ${familyFont1};
font-size: 14px;
font-weight: ${medium};
color: ${firstColor};
`

export const ContainerListCardClients = styled.div`
width: 100%;
height: fit-content;
padding: 0 10px;
`

export const ListaUlCardClients = styled.ul`
list-style-type: disc;
`

export const ListaLiCardClients = styled.li`
font-family: ${familyFont2};
font-size: 14px;
font-weight: ${medium};
color: ${firstColor};
margin: 10px 0;
cursor: pointer;
`

export const ContainerOptionsCardClients = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

export const OptionCardClients = styled.div`
width: 50%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
font-size: 20px;
color: ${textColor};
padding: 5px;
border-sizing: borber-box;

&& > * {
cursor: pointer;
}
`

export const ContainerModalClients = styled.div`
width: 100%;
height: fit-content;
background-color: ${textColor};
padding: 10px;
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
`

export const TituloContainerModalClients = styled.h1`
font-size: 22px;
font-family: ${familyFont1};
font-weight: ${extraBold};
color: ${thirdColor};
`

export const FormModalClients = styled.form`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;
`

export const LabelFormModalCliets = styled.label`
width: 90%;
display: flex;
flex-direction: column;
font-size: 14px;
font-family: ${familyFont1};
font-weight: ${regular};
gap: 3px;
color: ${thirdColor};
`

export const InputFormModalClients = styled.input`
width: 100%;
height: 25px;
border: 0;
padding: 5px 10px;
box-sizing: border-box;
font-size: 14px;
font-family: ${familyFont2};
font-weight:${medium}
color: ${thirdColor};
border-radius: 5px;
`

export const SelectFormModalClients = styled.select`
width: 100%;
height: 25px;
border: 0;
padding: 0 10px;
box-sizing: border-box;
font-size: 14px;
font-family: ${familyFont2};
font-weight:${medium}
color: ${thirdColor};
border-radius: 5px;
`

export const OptionSelectFormModalClients = styled.option`

`

export const TextareaFormModalClients = styled.textarea`
width: 100%;
height: 70px;
border: 0;
padding: 5px 10px;
box-sizing: border-box;
font-size: 14px;
font-family: ${familyFont2};
font-weight:${medium}
color: ${thirdColor};
border-radius: 5px;
`

export const ButtonFormModalClients = styled.button`
width: 140px;
height: 40px;
border: 0;
background-color: ${firstColor};
font-size: 16px;
font-family: ${familyFont1};
font-weight:${bold};
color: ${textColor};
margin-top: 15px;
border-radius: 15px;
`

export const MensajeErrorRegister = styled.div`
width: 80%;
text-align: center;
font-size: 16px;
padding: 3px;
box-sizing: border-box;
font-family: ${familyFont1};
font-weight: ${regular};
color: ${textError};
`