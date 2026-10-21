import styled from "styled-components";
import { black, bold, extraBold, familyFont1, familyFont2, firstColor, light, medium, regular, secondColor, secondColorRGB, semiBold, textColor, textColorRGB, thirdColor, thirdColorRGB } from "../helpers/stylesheet";

export const ContainerViewReports = styled.div`
width: 100%;
min-height: 100vh;
background-color: ${textColor};
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
`

export const ContainerHeaderViewReports = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px 10px;
box-sizing: border-box;
gap: 20px;
`

export const TitleContainerViewReports = styled.h1`
font-size: 24px;
font-family: ${familyFont1};
font-weight: ${bold};
color: ${firstColor};
`

export const ContainerOptionsViewReports = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: right;
gap: 5px;
`

export const OptionViewReports = styled.div`
width: 80px;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: start;
gap: 5px;
background-color: ${thirdColor};
color: ${textColor};
padding: 5px;
box-sizing: border-box;
border-radius: 5px;
font-size: 16px;
font-family: ${familyFont1};
font-weight: ${light};
cursor: pointer;
`

export const TitleOptionViewReports = styled.span`
text-align: center;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select:none;
user-select:none;
`

export const ContainerDateCreation = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 2px;
`

export const TitleDateCreation = styled.h2`
font-size: 14px;
font-family: ${familyFont2};
font-weight: ${medium};
color: ${firstColor};
`

export const TextDateCreation = styled.h3`
font-size: 14px;
font-family: ${familyFont2};
font-weight: ${medium};
color: ${firstColor};
`

export const ContainerBodyViewReports = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 10px;
box-sizing: border-box;
gap: 15px;
`

export const FieldsetBodyViewReports = styled.fieldset`
width: 100%;
height: fit-content;
border: 3px solid ${thirdColor};
padding: 10px;
box-sizing: border-box;
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: left;
gap: 15px 30px;
`

export const LegendBodyViewReports = styled.legend`
font-size: 16px;
font-family: ${familyFont2};
font-weight: ${black};
`

export const ContainerTextData = styled.div`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: row;
gap: 5px;
align-items: start;
justify-content: center;
`

export const TextTitle = styled.h2`
font-size: 14px;
font-family: ${familyFont1};
font-weight: ${extraBold};
`

export const TextContent = styled.span`
font-size: 14px;
font-family: ${familyFont1};
font-weight: ${medium};
`

export const ContainerJobs = styled.div`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: column;
gap: 10px;
`

export const ListUlContainerJobs = styled.ul`
display: flex;
flex-direction: column;
gap: 5px;
list-style-type: disc;
padding-left: 20px;
box-sizing: border-box;
`

export const ListLiContainerJobs = styled.li`
font-size: 14px;
font-family: ${familyFont1};
font-weight: ${medium};
`