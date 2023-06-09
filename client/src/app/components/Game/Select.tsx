"use client"

import { useState, useEffect } from 'react';

interface Props {
    question: string;
    aiResponse: string;
    userResponse: string;   
    selectedResponse: string;
    setSelectedResponse: (value: string) => void;
    setScore: (value: ((value:number) => number)) => void;
    setGamePeriod: (value: string) => void;    
};

export default function Select(props: Props) {
    const [response1, setResponse1] = useState("")
    const [response2, setResponse2] = useState("")
    const [btnOption1, setBtnOption1] = useState("btn-select-unselected");
    const [btnOption2, setBtnOption2] = useState("btn-select-unselected");        

    useEffect(() => {
        const twoResponses: string[] = [props.userResponse, props.aiResponse]
        const index1 = Math.round(Math.random());
        const index2 = 1 - index1;

        setResponse1(twoResponses[index1]);
        setResponse2(twoResponses[index2]);
    }, []);

    function handleSubmit() {
        if (props.selectedResponse.length === 0) {
            alert("Please select a response before submitting.");
            return;
        };

        if (props.selectedResponse === props.aiResponse) {
            props.setGamePeriod("incorrect");
            
            return;
        } else {
            props.setScore(prev => prev + 1);
            props.setGamePeriod("correct");         
            return;
        };
        // Need to add logic for next question
        
    };
    
    return(
        <div className="flex flex-col">           
            <h2>Question:</h2>                 
            <p>{props.question}</p>
            <h2 className='mt-8' >Click the response you think is made by a human:</h2>
            <button 
                className={btnOption1} 
                onClick={() => {
                    setBtnOption1("btn-select-selected")
                    setBtnOption2("btn-select-unselected")  
                    props.setSelectedResponse(response1)                  
                }}
            >   
                <div className='bg-red-800 px-6 py-4 border-r-2 rounded-l-2xl flex items-center'>
                    <h2>A</h2>   
                </div>       
                <div className='flex items-center'>
                    <p className='p-4'>{response1}</p>   
                </div>                                          
            </button>
            <button 
                className={btnOption2} 
                onClick={() => {
                    setBtnOption2("btn-select-selected")
                    setBtnOption1("btn-select-unselected")
                    props.setSelectedResponse(response2)    
                }}
            >        
                <div className='bg-blue-800 px-6 py-4 border-r-2 rounded-l-2xl flex items-center'>
                    <h2>B</h2>   
                </div>       
                <div className='flex items-center'>
                    <p className='p-4'>{response2}</p>   
                </div>                               
            </button>
            <button className='btn-submit' onClick={() => handleSubmit()}>
                Submit
            </button>            
        </div>
    );
};