"use client"

import { useState, useEffect } from 'react';
import { pusherClient } from '../../../../../lib/pusher';
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
            
            await addGameData(questions, responses, props.gameId, props.settings.numRounds);
            await distributeGameData(props.gameId);          
        };
                 
        generate();
    }, [])    

    useEffect(() => {  
        const channel = pusherClient.subscribe(props.gameId);
        channel.bind("receiveGameData", (gameData: {userId: string, data: SingleGameData[]}) => {
            if (gameData.userId === props.userId) {             
                setSelfGameData(gameData.data);
                setIsLoading(false);
            };                         
        
        });

        return () => {
            channel.unsubscribe();
            channel.unbind("receiveGameData", (gameData: SingleGameData[]) => {
                const filteredGameData = gameData.filter((singleData: SingleGameData) => singleData.senderUserId === props.userId);            
                setSelfGameData(filteredGameData);
                setIsLoading(false);
                
            });
        };

    }, []);
 
    return (
        <section>         
            {isLoading ? <Loading />: 
             <Main
                selfGameData={selfGameData}
                setSelfGameData={setSelfGameData}
             />
            }                  
        </section>       
    );
};