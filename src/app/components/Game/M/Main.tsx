"use client"

import Write from "./Write";
import Select from "./Select";
import Score from "./Score";
import EndScreen from "./EndScreen";
import { useState, useEffect, useContext } from "react";
import { checkAllReady } from "../../../../../lib/utils";
import { PusherContext } from '../../../../../lib/pusherContext';

interface Props {
    gameId: string;
    userId: string;
    selfGameData: SingleGameData[];
    setSelfGameData: (value: SingleGameData[]) => void;
};

export default function Main(props: Props) {
    const [gamePeriod, setGamePeriod] = useState("write")  
    const [score, setScore] = useState(0);
    const [roundNumber, setRoundNumber] = useState(1);
    const [selectQuestion, setSelectQuestion] = useState("");
    const [selectResponse1, setSelectResponse1] = useState("");
    const [selectResponse2, setSelectResponse2] = useState("");
    const [selectedResponse, setSelectedResponse] = useState("");
    const [humanResponse, setHumanResponse] = useState("");    

    const MAX_ROUNDS = props.selfGameData.length;
    const pusher = useContext(PusherContext);

    useEffect(() => {
        const channel = pusher.subscribe(props.gameId);
        channel.bind("receiveSelectData", (data: {receiverId: string, selectData: SingleGameData}) => { 
            if (data.receiverId === props.userId) {
                setSelectQuestion(data.selectData.question);
                setHumanResponse(data.selectData.userResponse!);
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

        channel.bind("checkAllReady", async (nextGamePeriod: string) => {
            const isAllReady = await checkAllReady(props.gameId);
            if (isAllReady) {
                setGamePeriod(nextGamePeriod);
            };     
        });

        return () => {
            channel.unsubscribe();

            channel.unbind("receiveSelectData", (data: {receiverId: string, selectData: SingleGameData}) => { 
                if (data.receiverId === props.userId) {
                    setSelectQuestion(data.selectData.question);
                    setHumanResponse(data.selectData.userResponse!);
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
    
            channel.unbind("checkAllReady", async (nextGamePeriod: string) => {
                const isAllReady = await checkAllReady(props.gameId);
                if (isAllReady) {
                    setGamePeriod(nextGamePeriod);
                };     
            });
        };

    }, []);

    return (
        <div>              
            {gamePeriod === "write" && 
            <Write      
                gameId={props.gameId}       
                userId={props.userId}  
                selfGameData={props.selfGameData}
                roundNumber={roundNumber}
                setSelfGameData={props.setSelfGameData}     
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
                humanResponse={humanResponse}      
                setSelectedResponse={setSelectedResponse}       
                setScore={setScore}     
                setGamePeriod={setGamePeriod}
            />
            }
            {gamePeriod === "score" && 
            <Score      
                gameId={props.gameId}       
                userId={props.userId}  
                score={score}
                roundNumber={roundNumber}
                MAX_ROUNDS={MAX_ROUNDS}                
                selectedResponse={selectedResponse}
                humanResponse={humanResponse}
                setRoundNumber={setRoundNumber}                
            />
            }         
            {gamePeriod === "endScreen" &&
            <EndScreen />
            }
        </div>
    );
};