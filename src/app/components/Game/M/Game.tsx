"use client"

import { useState, useEffect, useContext } from 'react';
import { PusherContext } from '../../../../../lib/pusherContext';
import { addGameData, distributeGameData, generateAIResponses, generateQuestions } from '../../../../../lib/utils';
import Loading from './Loading';
import Main from './Main';

interface Props {
    isError: boolean;
    setIsError: (value: boolean) => void;
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
                setSelfGameData(gameData.data);
                setIsLoading(false);
            };                     
        });

        return () => {
            channel.unsubscribe();
            channel.unbind("receiveGameData", (gameData: {userId: string, data: SingleGameData[]}) => {
                if (gameData.userId === props.userId) {                                     
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
            try {
                const numQuestions = props.numPlayers * props.settings.numRounds;
                const questions = await generateQuestions(numQuestions);   
                const responses = await generateAIResponses(questions);
         
                await addGameData(questions, responses, props.gameId);
                await distributeGameData(props.gameId);              
            } catch(e) {
                props.setIsError(true);
            };                 
        };
                 
        generate();
    }, [])     
   
    return (
        <section>         
            {isLoading ? <Loading />: 
             <Main
                isError={props.isError}
                setIsError={props.setIsError}                            
                gameId={props.gameId}
                userId={props.userId}                         
                selfGameData={selfGameData}
                maxRounds={props.settings.numRounds}
                setSelfGameData={setSelfGameData}                
             />
            }                  
        </section>       
    );
};