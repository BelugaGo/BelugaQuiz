import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { QuizContainer, QuizBox, QuizTitle, QuizText, QuizTextBox, QuizButtonBox, QuizButton, Completed, UserAlert } from './QuizElement'
import Question from '../Questions'
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide, TextField, Box} from '@mui/material';

const Quiz = () => {

const [questions, setQuestions] = useState([])
const [currentQuestion, setCurrentQuestion] = useState(0)
const [quizStarted, setQuizStarted] = useState(false)
const [score, setScore] = useState(0);
const [loading, setLoading] = useState(false);
const quizTimeout = useRef(null);
const homeTimeout = useRef(null);
const [open, setOpen] = useState(false);
const randomRef = useRef(null); 
const [user, setUser] = useState('');
const [successAlert , setSuccessAlert] = useState(false);
const [errorAlert , setErrorAlert] = useState(false);

const handleClear = () => {
  if (user === '') {
    setErrorAlert(true);

    setTimeout(() => {
      setErrorAlert(false);
    }, 3000);
  } else {
    setSuccessAlert(true);

    setTimeout(() => {
      setSuccessAlert(false);
    }, 1000);
  }
};




const funFacts = [
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "Octopuses have three hearts.",
  "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the metal.",
  "Bananas are berries, but strawberries are not.",
  "A group of flamingos is called a 'flamboyance.'",
  "Cows have best friends and get stressed when separated from them.",
  "The inventor of the Frisbee was turned into a Frisbee after he died.",
  "Wombat poop is cube-shaped.",
  "A single cloud can weigh more than 1 million pounds.",
  "The shortest war in history lasted 38 minutes (between Britain and Zanzibar on August 27, 1896).",
  "A 'jiffy' is an actual unit of time: 1/100th of a second.",
  "The heart of a shrimp is located in its head.",
  "Penguins have an organ above their eyes that converts seawater to fresh water.",
  "A snail can sleep for three years.",
  "The Twitter bird's official name is Larry.",
  "The unicorn is the national animal of Scotland.",
  "The total weight of ants on earth once equaled the total weight of people.",
  "Sea otters hold hands when they sleep to keep from drifting apart.",
  "A human could swim through a blue whale’s veins.",
  "The first computer 'bug' was an actual moth found in the machine.",
  "The longest time between two twins being born is 87 days.",
  "The moon has moonquakes.",
  "Humans are the only animals that blush.",
  "The world’s oldest toy is a stick.",
  "Dolphins have names for each other.",
  "The word 'nerd' was first coined by Dr. Seuss in 'If I Ran the Zoo.'",
  "Cucumbers are 96% water.",
  "Chewing gum boosts mental proficiency and is considered a better test aid than caffeine.",
  "The world's largest snowflake recorded was 15 inches wide.",
  "Bees sometimes sting other bees.",
  "Avocados were once called 'alligator pears.'",
  "The fingerprints of a koala are so indistinguishable from humans that they have on occasion been confused at a crime scene.",
  "Humans share 50% of their DNA with bananas.",
  "The first alarm clock could only ring at 4 a.m.",
  "Birds don’t urinate.",
  "A cat has 32 muscles in each ear.",
  "Butterflies taste with their feet.",
  "The inventor of the microwave appliance only received $2 for his discovery.",
  "In Switzerland, it's illegal to own just one guinea pig; you must have at least two.",
  "Starfish are not fish, and killer whales are not whales.",
  "A baby octopus is about the size of a flea when it's born.",
  "The shortest complete sentence in the English language is 'I am.'",
  "There are more possible iterations of a game of chess than there are atoms in the known universe.",
  "Cats have fewer toes on their back paws.",
  "Like fingerprints, everyone's tongue print is different.",
  "Most of the dust in your home is made from dead skin cells.",
  "The world's oldest piece of chewing gum is over 9,000 years old.",
  "A rhinoceros' horn is made of hair.",
  "It is impossible for most people to lick their own elbow (go ahead, try it).",
  "A shrimp's heart is in its head."
];


const relaxationActivities = [
  "Practice deep, slow breaths to calm the nervous system.",
  "Tense and relax each muscle group, starting from your toes and moving upwards.",
  "Focus on your breath and observe your thoughts without judgment.",
  "Visualize a peaceful scene or journey to help relax your mind.",
  "Engage in gentle physical movements to release muscle tension.",
  "Use calming scents like lavender or chamomile to relax.",
  "Play soft, ambient music or nature sounds.",
  "Take a brief, leisurely walk to help clear your mind.",
  "Write down your thoughts or worries to help release them.",
  "Reflect on things you’re thankful for to foster a positive mindset."
];

const handleDialog = () => {
  const together = [...funFacts, ...relaxationActivities];
 return together[Math.floor(Math.random() * together.length)];
};

const randomClick = () => {
  randomRef.current.textContent = handleDialog();
};


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


const handleStartQuiz = () => {
  setLoading(true);
  quizTimeout.current = setTimeout(() => {
  setQuizStarted(true);
  setCurrentQuestion(0);
  setScore(0);
  setLoading(false);
  }, 1000);

};

const handleHome = () => {
  setLoading(true);
  homeTimeout.current = setTimeout(() => {
  setQuizStarted(false);
  setCurrentQuestion(0);
  setScore(0);
  setLoading(false);
  setUser('');
  window.location.reload();
  }, 1000);
};

useEffect(() => {
  return () => {
    if (quizTimeout.current) {
      clearTimeout(quizTimeout.current);
    }
    if (homeTimeout.current) {
      clearTimeout(homeTimeout.current);
    }
  };
}, []);

{/*API Call*/}
useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://the-trivia-api.com/v2/questions');
      const questionsData = response.data;

      if (questionsData.length > 0) {
        setQuestions(questionsData);
      } else {
        console.error('No questions found in the API response.');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  fetchQuestions();
}, []);


const handleNextQuestion = () => {
  setCurrentQuestion(currentQuestion + 1);
}

  return (

    <QuizContainer maxWidth disableGutters>
      
    <QuizBox boxShadow={5}>
    {!quizStarted ? (
      <>
    <QuizTitle variant='h3'>Quiz<br /><span className='quiztitleSpan'>Test Your General Knowledge</span></QuizTitle>

     <QuizTextBox>
     <QuizText variant='h5'>Dive into the Quiz Quest! 🌐 🧠 Uncover the excitement as you navigate through 10 intriguing questions. No ticking clock, just pure quiz fun. Are you ready to unlock your knowledge and emerge victorious? Let the Quiz Quest begin! 🚀🔍</QuizText>

     <Box gap={1} sx={{ width: '100%', display: 'flex', justifyContent: 'center'  }}>
     <TextField error={errorAlert} onChange={(e) => setUser(e.target.value)} sx={{ width: '70%' }} id="outlined-basic" label="Enter Your Name" variant="outlined" type='name' value={user} /><Button onClick={handleClear} className='bounce' variant='contained' color='primary'>Submit</Button>
     </Box>

     <QuizButtonBox>
     <QuizButton sx={{ boxShadow: 5 }} onClick={handleClickOpen} variant='contained' color='secondary'>I Not Ready</QuizButton>
     <QuizButton sx={{ boxShadow: 5 }} onClick={handleStartQuiz} variant='contained' color='primary'>Start Quiz</QuizButton>
     <Backdrop open={loading}><CircularProgress color='inherit'/></Backdrop>
     </QuizButtonBox>
      {errorAlert && <UserAlert severity="error">Please Enter Your Name</UserAlert>}
      {successAlert && <UserAlert severity="success">Start Your Quiz!</UserAlert>}
     </QuizTextBox>

     <React.Fragment>
      <Dialog
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
        transitionDuration={500}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Random Fun Fact or Relaxation Activity"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText ref={randomRef} id="alert-dialog-description">
            {handleDialog()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={randomClick}>Another One</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
      </>

) : (
  <>

 {questions.length > 0 && currentQuestion < questions.length && (
    <Question
      question={questions[currentQuestion].question.text}
      incorrectAnswers={[...questions[currentQuestion].incorrectAnswers]}
      correctAnswer={questions[currentQuestion].correctAnswer}
      onNextQuestion={handleNextQuestion}
      score={score}
      setScore={setScore}
    />
  )}
  <QuizButton className='home' sx={{ boxShadow: 5 }} onClick={handleHome} variant='contained' color='primary'>Home</QuizButton>
  <Backdrop open={loading}><CircularProgress color='inherit'/></Backdrop>
  {currentQuestion === questions.length && <Completed><span className='goodJob'>Good Job {user}!</span> <br />You Scored: {score}/10</Completed>}
  </>
)}
    </QuizBox>
</QuizContainer>
  );
}

export default Quiz;