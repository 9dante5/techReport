import styled from "styled-components";
import { black, bold, extraBold, familyFont1, familyFont2, firstColor, firstColorRBG, medium, regular, secondColor, semiBold, textColor, textColorRGB, thirdColor, thirdColorRGB } from "../helpers/stylesheet";

export const ContainerReports = styled.div`
width: 100%;
min-heiight: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justy-content: center;
`

export const ContainerFormReports = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
padding: 10px 0;
box-sizing: border-box;
gap: 10px;
align-items: center;
justify-content: center;
`

export const TitleContainerFormReports = styled.h2`
font-family: ${familyFont1};
font-size: 20px;
font-weight: ${bold};
color: ${textColor};
`

export const FormReports = styled.form`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
`

export const TitleAccordion = styled.span`
font-family: ${familyFont2};
font-size: 14px;
font-weight: ${extraBold};
color: rgba(${firstColorRBG[0]}, ${firstColorRBG[1]}, ${firstColorRBG[2]}, .7)
`

export const ContainerInputsFormReports = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
`

export const FieldsetFormReports = styled.fieldset`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
gap: 15px;
padding: 10px 20px;
box-sizing: border-box;
border: 2px solid ${thirdColor};
`

export const LegendFormReports = styled.legend`
font-family: ${familyFont2};
font-size: 16px;
font-weight: ${semiBold};
color: ${thirdColor}
`

export const LabelFormReports = styled.label`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
gap: 5px;
font-family: ${familyFont1};
font-size: 14px;
font-weight: ${medium};
color: ${firstColor};
`

export const InputFormReports = styled.input`
width: 100%;
height: 30px;
border: none;
border-radius: 5px;
outline: none;
background-color: rgba(${firstColorRBG[0]}, ${firstColorRBG[1]}, ${firstColorRBG[2]}, .4);
font-family: ${familyFont1};
font-size: 14px;
font-weight: ${medium};
color: ${textColor};
padding: 10px;
box-sizing: border-box;
`

export const TextareaFormReports = styled.textarea`
width: 100%;
height: 70px;
border: none;
border-radius: 5px;
outline: none;
background-color: rgba(${firstColorRBG[0]}, ${firstColorRBG[1]}, ${firstColorRBG[2]}, .4);
font-family: ${familyFont1};
font-size: 14px;
font-weight: ${medium};
color: ${textColor};
padding: 10px;
box-sizing: border-box;
`

export const SelectFormReports = styled.select`
width: 100%;
height: 40px;
border: none;
border-radius: 5px;
outline: none;
background-color: rgba(${firstColorRBG[0]}, ${firstColorRBG[1]}, ${firstColorRBG[2]}, .4);
font-family: ${familyFont1};
font-size: 14px;
font-weight: ${medium};
color: ${textColor};
padding: 10px;
box-sizing: border-box;
`

export const OptionSelectFormReports = styled.option`

`

export const ButtonFormReports = styled.button`
width: 150px;
height: 50px;
border: 0;
border-radius: 20px;
background-color: ${firstColor};
color: ${textColor};
font-family: ${familyFont2};
font-size: 14px;
font-weight: ${extraBold};
`



export const ContainerCardsReports = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
padding: 20px 10px;
box-sizing: border-box;
gap: 30px;
`

export const CardReports = styled.div`
width: 250px;
height: 200px;
background-color: rgba(${thirdColorRGB[0]}, ${thirdColorRGB[1]}, ${thirdColorRGB[2]}, .5);
display: flex;
flex-direction: column;
padding: 15px ;
box-sizing: border-box;
align-items: center;
justify-content: center;
gap: 15px;
border-radius: 40px 10px;
box-shadow: 0 0 10px ${secondColor}
`

export const ContainerTitleCardReports = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 5px;
`

export const TitleCardReports = styled.h1`
font-family: ${familyFont1};
font-size: 16px;
font-weight: ${bold};
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, .7);
user-select: none;
`

export const SubtitleCardReports = styled.h2`
font-family: ${familyFont2};
font-size: 14px;
font-weight: ${medium};
text-align: center;
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, .7);
cursor: pointer;
`

export const ContainerInfoCardResports = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: left;
justify-content: center;
gap: 5px;
`

export const InfoCardReports = styled.span`
font-family: ${familyFont1};
font-size: 14px;
font-weight: ${regular};
text-align: left;
color: rgba(${textColorRGB[0]}, ${textColorRGB[1]}, ${textColorRGB[2]}, .7);
`