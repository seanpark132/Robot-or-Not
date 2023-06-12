"use client"

import Write from "./Write";
import Select from "./Select";
import Correct from "./Correct";
import Incorrect from "./Incorrect";
import EndScreen from "./EndScreen";
import { useState } from "react";

interface Props {
    questionArray: string[];
    responseArray: string[];
    question: string;
    aiResponse: string;
    userResponse: string;
    setQuestion: (value: string) => void;
    setAiResponse: (value: string) => void;
    setUserResponse: (value: string) => void;
};

export default function Main(props: Props) {
    const [gamePeriod, setGamePeriod] = useState("userResponse")  
    const [score, setScore] = useState(0);
    const [roundNumber, setRoundNumber] = useState(1);
    const [selectedResponse, setSelectedResponse] = useState("");

    return (
        <div>              
            {gamePeriod === "userResponse" && 
            <Write               
                question={props.question}
                aiResponse={props.aiResponse}
                userResponse={props.userResponse}
                setUserResponse={props.setUserResponse}
                setGamePeriod={setGamePeriod}
            />
            }
            {gamePeriod === "select" && 
            <Select 
                question={props.question}
                aiResponse={props.aiResponse}
                userResponse={props.userResponse}        
                selectedResponse={selectedResponse}      
                setSelectedResponse={setSelectedResponse}       
                setScore={setScore}     
                setGamePeriod={setGamePeriod}
            />
            }
            {gamePeriod === "correct" &&
            <Correct 
                questionArray={props.questionArray}
                responseArray={props.responseArray}
                score={score}
                roundNumber={roundNumber}
                selectedResponse={selectedResponse}
                setRoundNumber={setRoundNumber}
                setQuestion={props.setQuestion}
                setAiResponse={props.setAiResponse}
                setUserResponse={props.setUserResponse}
                setGamePeriod={setGamePeriod}
            />
            }
            {gamePeriod === "incorrect" &&
            <Incorrect 
                questionArray={props.questionArray}
                responseArray={props.responseArray}
                score={score}
                roundNumber={roundNumber}
                selectedResponse={selectedResponse}
                setRoundNumber={setRoundNumber}
                setQuestion={props.setQuestion}
                setAiResponse={props.setAiResponse}
                setUserResponse={props.setUserResponse}
                setGamePeriod={setGamePeriod}
            />
            }        
            {gamePeriod === "endScreen" &&
            <EndScreen />
            }
        </div>
    );
};