"use client"

import Write from "./Write";
import Select from "./Select";
import Score from "./Score";
import EndScreen from "./EndScreen";
import { useState, useEffect, useContext } from "react";
import { checkAllReady } from "../../../../../lib/utils";
import { PusherContext } from '../../../../../lib/pusherContext';

interface Props {
    isError: boolean;
    setIsError: (value: boolean) => void;
    gameId: string;
    userId: string;
    selfGameData: SingleGameData[];
    maxRounds: number;
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
    const [senderNickname, setSenderNickName] = useState("");
    
    const pusher = useContext(PusherContext);

    useEffect(() => {
        const channel = pusher.subscribe(props.gameId);
        channel.bind("receiveSelectData", (data: {receiverId: string, nickname: string, selectData: SingleGameData}) => { 
            if (data.receiverId === props.userId) {
                setSelectQuestion(data.selectData.question);
                setHumanResponse(data.selectData.userResponse!);
                setSenderNickName(data.nickname);
                const zeroOrOne = Math.floor(Math.random() * 2);

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

            channel.unbind("receiveSelectData", (data: {receiverId: string, nickname: string, selectData: SingleGameData}) => { 
                if (data.receiverId === props.userId) {
                    setSelectQuestion(data.selectData.question);
                    setHumanResponse(data.selectData.userResponse!);
                    setSenderNickName(data.nickname);
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
                isError={props.isError}
                setIsError={props.setIsError} 
                gameId={props.gameId}       
                userId={props.userId}  
                selfGameData={props.selfGameData}
                roundNumber={roundNumber}                   
            />
            }
            {gamePeriod === "select" && 
            <Select    
                isError={props.isError}
                setIsError={props.setIsError} 
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
                isError={props.isError}
                setIsError={props.setIsError}
                gameId={props.gameId}       
                userId={props.userId}  
                score={score}
                roundNumber={roundNumber}
                maxRounds={props.maxRounds}           
                selectedResponse={selectedResponse}
                humanResponse={humanResponse}
                senderNickname={senderNickname}
                setRoundNumber={setRoundNumber}                
            />
            }         
            {gamePeriod === "endScreen" &&
            <EndScreen />
            }
        </div>
    );
};