"use client"

import { useState, useEffect } from 'react';
import  _ from 'lodash';
import { randomizeSendToUserIds, randomizedToFalse, sendSelectData, updateUserIsReady, updateUserResponse } from '../../../../lib/utils';

interface Props {
    isError: boolean;
    setIsError: (value: boolean) => void;
    gameId: string;
    userId: string;
    selfGameData: SingleGameData[];
    roundNumber: number;     
    isLobbyMaster: boolean;
};

export default function Write(props: Props) {
    const [inputUserResponse, setInputUserResponse] = useState("");
    const [didUserSubmit, setDidUserSubmit] = useState(false);
    const [currentRoundData, setCurrentRoundData] = useState<SingleGameData>({
        id: 0,
        question: "",
        aiResponse: "",
        userResponse: "",
        gameId: "",
        userId: "" 
    });  
    
    useEffect(() => {
        setCurrentRoundData(props.selfGameData[props.roundNumber - 1]);

        const reset = async () => {           
            await updateUserIsReady(props.gameId, props.userId, false, "write"); 
            if (props.isLobbyMaster) {
                await randomizedToFalse(props.gameId);
            };
        };   
        
        reset();     
    }, []);
        
    return(  
        <>
        { currentRoundData.id !== 0 &&     
        <div className="flex flex-col">        
            <h2>Question:</h2>
            <p>{currentRoundData.question}</p>
            <h2 className="mt-6">Robot Response:</h2>
            <p className="mb-6">{currentRoundData.aiResponse}</p>  
            <label htmlFor="humanResponse">Your Response:</label>
            <textarea 
                className="input-human-response" 
                id="humanResponse"
                value={inputUserResponse}
                onChange={(e) => {
                    if (!didUserSubmit) {
                        setInputUserResponse(e.target.value);
                    };
                }}
            />       
            {didUserSubmit? <h1 className='mt-8 py-2 px-4 self-center text-center'>Waiting for others...</h1>
            :<button className="btn-submit" onClick={() => handleSubmit()} >Submit</button>}          
        </div>             
        }
        </>
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

        await randomizeSendToUserIds(props.gameId);        
        await sendSelectData(props.gameId, props.userId, selectData);
        await updateUserResponse(currentRoundData.id, inputUserResponse);
        await updateUserIsReady(props.gameId, props.userId, true, "select");         
    };

};