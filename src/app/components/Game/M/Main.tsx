"use client"

import Write from "./Write";
import Select from "./Select";
import Correct from "./Correct";
import Incorrect from "./Incorrect";
import EndScreen from "./EndScreen";
import { useState, useEffect } from "react";
import { pusherClient } from "../../../../../lib/pusher";

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
    const [selectQuestion, setSelectQuestion] = useState("");
    const [selectResponse1, setSelectResponse1] = useState("");
    const [selectResponse2, setSelectResponse2] = useState("");
    const [selectedResponse, setSelectedResponse] = useState("");

    useEffect(() => {
        const channel = pusherClient.subscribe(props.gameId);
        channel.bind("receiveSelectData", (data: {receiverId: string, selectData: SingleGameData}) => {
            console.log("HELLO?")
            console.log(data.selectData)
            if (data.receiverId === props.userId) {
                setSelectQuestion(data.selectData.question);

                const zeroOrOne = Math.floor(Math.random() * 2)
                if (zeroOrOne === 0) {
                    setSelectResponse1(data.selectData.aiResponse);
                    setSelectResponse2(data.selectData.userResponse!);
                } else {
                    setSelectResponse2(data.selectData.aiResponse);
                    setSelectResponse1(data.selectData.userResponse!);
                };
            };
        });

        return () => {
            channel.unsubscribe();
            channel.unbind("receiveSelectData", (data: {receiverId: string, selectData: SingleGameData}) => {
                console.log("HELLO?")
                console.log(data.selectData)
                if (data.receiverId === props.userId) {
                    setSelectQuestion(data.selectData.question);
    
                    const zeroOrOne = Math.floor(Math.random() * 2)
                    if (zeroOrOne === 0) {
                        setSelectResponse1(data.selectData.aiResponse);
                        setSelectResponse2(data.selectData.userResponse!);
                    } else {
                        setSelectResponse2(data.selectData.aiResponse);
                        setSelectResponse1(data.selectData.userResponse!);
                    };
                };
            });
        };

    }, []);
  
    return (
        <div>              
            {gamePeriod === "userResponse" && 
            <Write      
                gameId={props.gameId}       
                userId={props.userId}  
                selfGameData={props.selfGameData}
                roundNumber={roundNumber}
                setSelfGameData={props.setSelfGameData}              
                setGamePeriod={setGamePeriod}
            />
            }
            {gamePeriod === "select" && 
            <Select      
                gameId={props.gameId}       
                userId={props.userId}   
                selectQuestion={selectQuestion}
                selectResponse1={selectResponse1}
                selectResponse2={selectResponse2}
                selectedResponse={selectedResponse}      
                setSelectedResponse={setSelectedResponse}       
                setScore={setScore}     
                setGamePeriod={setGamePeriod}
            />
            }
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