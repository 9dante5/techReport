import styled from "styled-components";
import { firstColor } from "../helpers/stylesheet";

export const ContainerLoading = styled.div`
width: 100%;
height: 100vh;
background-color: ${firstColor};
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const ImgLoading = styled.img`
width: 300px;
height: auto;
`