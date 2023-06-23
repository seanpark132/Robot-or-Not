"use client"

import { useState, useEffect } from 'react';
import  _ from 'lodash';
import { randomizeSendToUserIds, sendSelectData, updateUserIsReady, updateUserResponse } from '../../../../../lib/utils';
import { pusherClient } from '../../../../../lib/pusher';
import { checkAllReady } from "../../../../../lib/utils";

interface Props {
    gameId: string;
    userId: string;
    selfGameData: SingleGameData[];
    roundNumber: number;
    setSelfGameData: (value: SingleGameData[]) => void;
    setGamePeriod: (value: string) => void;
};

export default function Write(props: Props) {
    const [inputUserResponse, setInputUserResponse] = useState("");
    const [didUserSubmit, setDidUserSubmit] = useState(false);

    useEffect(() => {
        const channel = pusherClient.subscribe(props.gameId);
        channel.bind("checkAllReady", async () => {
            const isAllReady = await checkAllReady(props.gameId);
            if (isAllReady) {
                props.setGamePeriod("select");
            };     
        });

        return () => {
            channel.unsubscribe();
            channel.unbind("checkAllReady", async () => {
                const isAllReady = await checkAllReady(props.gameId);
                if (isAllReady) {
                    props.setGamePeriod("select");
                };     
            });    
        };

    }, []);

    const currentRoundData = props.selfGameData[props.roundNumber-1];
        
    return(
        <div className="flex flex-col">
            <h2>Question:</h2>
            <p>{currentRoundData.question}</p>
            <h2 className="mt-6">Robot Response:</h2>
            <p className="mb-6">{currentRoundData.aiResponse}</p>  
            <label htmlFor="humanResponse">Your Response:</label>
            <textarea 
                className="input-human-response" 
                name="humanResponse"
                value={inputUserResponse}
                onChange={(e) => setInputUserResponse(e.target.value)}
            />  
            <div className="mt-1 w-full h-5"><p className="text-sm float-right mr-1">Word Count: 0/30</p></div>
            {didUserSubmit? <h2>Waiting for other users to submit their response...</h2>
            :<button className="btn-submit" onClick={() => handleSubmit()} >Submit</button>}
        </div>
    );

    async function handleSubmit() {
        if (inputUserResponse.length < 1) {
            alert("Please enter a response with at least 1 word");
            return;
        };             

        setDidUserSubmit(true);

        let deepClone = _.cloneDeep(props.selfGameData);
        deepClone[props.roundNumber - 1].userResponse = inputUserResponse;
        const selectData = deepClone[props.roundNumber - 1];
        props.setSelfGameData(deepClone);
        
        await randomizeSendToUserIds(props.gameId);
        await sendSelectData(props.gameId, props.userId, selectData);
        // await updateUserResponse(currentRoundData.id, inputUserResponse);
        await updateUserIsReady(props.gameId, props.userId, true); 
        
    };

};