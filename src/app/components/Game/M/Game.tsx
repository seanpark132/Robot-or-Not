"use client"

import { useState, useEffect, useContext } from 'react';
import { PusherContext } from '../../../../../lib/pusherContext';
import { addGameData, distributeGameData, generateAIResponse, generateQuestions } from '../../../../../lib/utils';
import Loading from './Loading';
import Main from './Main';

interface Props {
    gameId: string;
    userId: string;
    settings: Settings;
    numPlayers: number;
    isLobbyMaster: boolean;
};

export default function Game(props: Props) {
    const [isLoading, setIsLoading] = useState(true); 
    const [selfGameData, setSelfGameData] = useState<SingleGameData[]>([]);  
    const pusher = useContext(PusherContext);

    useEffect(() => {  
        const channel = pusher.subscribe(props.gameId);  
        channel.bind("receiveGameData", (gameData: {userId: string, data: SingleGameData[]}) => {
            if (gameData.userId === props.userId) {      
                console.log("received game data:")
                console.log(gameData)                       
                setSelfGameData(gameData.data);
                setIsLoading(false);
            };                     
        });

        return () => {
            channel.unsubscribe();
            channel.unbind("receiveGameData", (gameData: {userId: string, data: SingleGameData[]}) => {
                if (gameData.userId === props.userId) {      
                    console.log("received game data:")
                    console.log(gameData)                          
                    setSelfGameData(gameData.data);
                    setIsLoading(false);
                }; 
            });   
        };
    });

    useEffect(() => {
        if (!props.isLobbyMaster) {
            return;
        };

        const generate = async () => {
            const numQuestions = props.numPlayers * props.settings.numRounds;
            const questions = await generateQuestions(numQuestions);   

            async function generateResponsesInParallel(questions: string[]) {
                const promises = questions.map(async (q) => {
                    return await generateAIResponse(q);
                });
                const responses = await Promise.all(promises);               
                return responses;
            };

            const responses = await generateResponsesInParallel(questions);
            
            await addGameData(questions, responses, props.gameId);
            await distributeGameData(props.gameId);
            console.log("client finished distributing game data")          
        };
                 
        generate();
    }, [])     
 
    return (
        <section>         
            {isLoading ? <Loading />: 
             <Main
                gameId={props.gameId}
                userId={props.userId}                         
                selfGameData={selfGameData}
                setSelfGameData={setSelfGameData}
             />
            }                  
        </section>       
    );
};