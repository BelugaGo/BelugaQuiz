import { Button, Container, LinearProgress, Typography, styled } from "@mui/material";

export const QuestionContainer = styled(Container)`
display: flex;
overflow: hidden;
flex-direction: column;
align-items: center;
height: 100%;
position: relative;
`;

export const QuestionText = styled(Typography)`
font-size: 1.5rem;
font-weight: bold;
text-align: center;
padding: 1rem;

@media screen and (max-width: 488px) {
    height: 10rem;
    overflow: scroll;

::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

 }
`;

export const QuestionButton = styled(Button)`
margin: 1rem;
`;

export const QuestionAmount = styled(LinearProgress)`
position: absolute;
bottom: 15px;
left: 20px;
width: 40%;

.MuiLinearProgress-barColorPrimary {
background: rgb(131,58,180);
background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
  }
`;