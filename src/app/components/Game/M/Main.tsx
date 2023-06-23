"use client"

import Write from "./Write";
import Select from "./Select";
import Correct from "./Correct";
import Incorrect from "./Incorrect";
import EndScreen from "./EndScreen";
import { useState } from "react";

interface Props {
    gameId: string;
    userId: string;
    selfGameData: SingleGameData[];
    setSelfGameData: (value: SingleGameData[]) => void;
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
                gameId={props.gameId}       
                userId={props.userId}  
                selfGameData={props.selfGameData}
                roundNumber={roundNumber}              
                setGamePeriod={setGamePeriod}
            />
            }
            {/* {gamePeriod === "select" && 
            <Select 
                selfGameData={props.selfGameData}
                selectedResponse={selectedResponse}      
                setSelectedResponse={setSelectedResponse}       
                setScore={setScore}     
                setGamePeriod={setGamePeriod}
            />
            } */}
            {/* {gamePeriod === "correct" &&
            <Correct           
                score={score}
                roundNumber={roundNumber}
                selectedResponse={selectedResponse}
                setRoundNumber={setRoundNumber}
            
                setGamePeriod={setGamePeriod}
            />
            }
            {gamePeriod === "incorrect" &&
            <Incorrect 
            
                score={score}
                roundNumber={roundNumber}
                selectedResponse={selectedResponse}
                setRoundNumber={setRoundNumber}          
                setGamePeriod={setGamePeriod}
            />
            }         */}
            {gamePeriod === "endScreen" &&
            <EndScreen />
            }
        </div>
    );
};