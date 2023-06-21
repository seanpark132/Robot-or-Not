"use client"

import { useState } from 'react';
import  _ from 'lodash';

interface Props {
    selfGameData: SingleGameData[];
    roundNumber: number;
    setSelfGameData: (value: SingleGameData[]) => void;
    setGamePeriod: (value: string) => void;
};

export default function Write(props: Props) {
    const [inputUserResponse, setInputUserResponse] = useState("");
        
    return(
        <div className="flex flex-col">
            <h2>Question:</h2>
            <p>{props.selfGameData[props.roundNumber-1].question}</p>
            <h2 className="mt-6">Robot Response:</h2>
            <p className="mb-6">{props.selfGameData[props.roundNumber-1].aiResponse}</p>  
            <label htmlFor="humanResponse">Your Response:</label>
            <textarea 
                className="input-human-response" 
                name="humanResponse"
                value={inputUserResponse}
                onChange={(e) => setInputUserResponse(e.target.value)}
            />  
            <div className="mt-1 w-full h-5"><p className="text-sm float-right mr-1">Word Count: 0/30</p></div>
            <button 
                className="btn-submit" 
                onClick={() => handleSubmit()}
            >
            Submit
            </button>
        </div>
    );

    function handleSubmit() {
        if (inputUserResponse.length < 1) {
            alert("Please enter a response with at least 1 word");
            return;
        };       

        let updatedGameData = _.cloneDeep(props.selfGameData);
        updatedGameData[props.roundNumber - 1].userResponse = inputUserResponse;
        
        props.setSelfGameData(updatedGameData);

       
        // props.setGamePeriod("select")      
    };
};