import React, { useState, useEffect, useRef } from 'react';
import { QuestionContainer, QuestionText, QuestionButton, QuestionAmount} from './QuestionsElement';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Divider, FormHelperText, LinearProgress } from '@mui/material';


const Question = ({ question, onNextQuestion, incorrectAnswers, correctAnswer, score, setScore }) => {


  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState(null);
  const [combine, setCombine] = useState([]);
  const [numberQuestions, setNumberQuestions] = useState(0);


  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
    setHelperText();
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedAnswer.trim() === '') {
      setError(true);
      setHelperText('Please select an answer.');
    } else {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
        onNextQuestion(setNumberQuestions(numberQuestions + 1)); 
        setError(false);
        setHelperText();
        setSelectedAnswer(' ');
    }
  };

  useEffect(() => {
  const combine = [...incorrectAnswers, correctAnswer];
  combine.sort(() => Math.random() - 0.5);
  setCombine(combine);

  }, [incorrectAnswers, correctAnswer]);

  return (
    <QuestionContainer>
      <FormControl error={error} sx={{ width: '100%' }}>
        <FormLabel><QuestionText>{question}</QuestionText></FormLabel>
          <RadioGroup onChange={handleRadioChange} value={selectedAnswer}>
          {combine.map((option, index) => (
            <React.Fragment key={index}>
            <FormControlLabel
                sx={{ width: '100%'}}
                value={option}
                control={<Radio  sx={{
                  '&.Mui-checked': {
                    color: 'purple',
                  },
                }}	/>} 
                label={option}
            />
            <Divider />
            </React.Fragment>
           ))}
          </RadioGroup>
          <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>
      </FormControl>
      <QuestionButton variant='contained' color='secondary' onClick={handleSubmit}>Next Question</QuestionButton>
      <QuestionAmount variant='determinate' value={numberQuestions * 10} />
    </QuestionContainer>
  );
};

export default Question;
