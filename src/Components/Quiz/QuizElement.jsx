import { Alert, Box, Button, Container, Typography, styled } from "@mui/material";

export const QuizContainer = styled(Container)`
background-color: #000;
height: 100%;
width: 100%;
display: flex;
justify-content: center; 
align-items: center;
overflow: hidden;




#textfieldBox {
    
    @media screen and (max-width: 320px) {
        padding: 20px;
    }
}
`;

export const QuizBox = styled(Box)`
display: flex;
flex-direction: column;
align-items: center;
background-color: #fff;
height: 700px;
width: 700px;
border-radius: 10px;    
position: relative;

@media screen and (max-width: 480px) {
    height: 100%;
}

.home {
    position: absolute;
    bottom: 15px;
    right: 20px;
}

.bounce {
    
    &:active {
        transform: translateY(1px);
    }
}

.goodJob {
font-size: 4rem;
font-weight: bold;
}
`;

export const QuizTitle = styled(Typography)`
text-align: center;
font-family: Quicksand, sans-serif;
font-weight: 500;
padding-top: 1rem;

.quiztitleSpan {
position: relative;
text-decoration: underline;
bottom: 20px;    
font-size: 20px;
font-weight: 400;
}
`;

export const QuizTextBox = styled(Box)`
height: 100%;
width: 90%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`;

export const QuizText = styled(Typography)`
position: relative;
text-align: left;
padding: 1rem;
top: 10px;
line-height: 1.5;
font-family: Bebas Neue;
border: 1px solid #000;
border-radius: 10px;
`;

export const QuizButtonBox = styled(Box)`
display: flex;
justify-content: space-between; 
width: 100%;
`;

export const QuizButton = styled(Button)`
font-family: Quicksand, sans-serif;
position: relative;
transition: all 0.3s ease-in-out;

&:hover {
    transform: scale(1.1) translateY(-7px);
    transition: all 0.3s ease-in-out;
}

&::after {
content: '';
position: absolute;
width: 0%;
height: 1px;
top: -100px;
opacity: 0;
transition: all 0.5s ease-in-out;
 }

&:hover::after {
background-color: black;
transition: all 0.3s ease-in-out;
opacity: 1;
top: -3px;  
width: 99%;
}

 &::before {
content: '';
position: absolute;
width: 0%;
height: 1px;
bottom: -100px;
opacity: 0;
transition: all 0.5s ease-in-out;
 }

&:hover::before { 
background-color: black;
transition: all 0.3s ease-in-out;
opacity: 1;
bottom: -3px;  
width: 99%;
}
`;

export const Completed = styled(Typography)`
font-family: Quicksand, sans-serif;
font-size: 2.5rem;
//font-weight: bold;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 100%;
text-align: center;

@media screen and (max-width: 480px) {
font-size: 35px;
}
`;

export const UserAlert = styled(Alert)`
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: Quicksand, sans-serif;
    font-weight: bold;
    text-align: center;
`;