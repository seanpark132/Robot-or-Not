"use client"

import UserResponse from "./UserResponse";
import Select from "./Select";
import Correct from "./Correct";
import Incorrect from "./Incorrect";
import { useState } from "react";

interface Props {
    question: string;
    aiResponse: string;
    userResponse: string;
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
            <UserResponse                 
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
                selectedResponse={selectedResponse}
                setGamePeriod={setGamePeriod}
            />
            }
            {gamePeriod === "incorrect" &&
            <Incorrect 
                selectedResponse={selectedResponse}
                setGamePeriod={setGamePeriod}
            />
            }        
        </div>
    );
};