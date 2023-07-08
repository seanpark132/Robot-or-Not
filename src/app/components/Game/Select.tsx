"use client"

import { readyCheck } from '@root/lib/utils';
import { useEffect, useState } from 'react';

interface Props {  
    isError: boolean;
    setIsError: (value: boolean) => void;
    gameId: string;
    userId: string;
    selectQuestion: string;
    selectResponse1: string;
    selectResponse2: string;
    selectedResponse: string;
    humanResponse: string;
    senderNickname: string;
    setSelectedResponse: (value: string) => void;
    setScore: (value: ((value:number) => number)) => void;
    setGamePeriod: (value: string) => void;    
};

export default function Select(props: Props) {
    const [btnStyle1, setBtnStyle1] = useState("btn-select-unselected left-to-right");
    const [btnStyle2, setBtnStyle2] = useState("btn-select-unselected right-to-left");   
    const [didUserSubmit, setDidUserSubmit] = useState(false);   
   
    useEffect(() => {
        const reset = async () => {
            props.setSelectedResponse("");       
        };   
        
        reset();        
    }, []);
    
    return(         
        <>                 
            {props.selectQuestion.length === 0 ? <h2>Loading...</h2>: 
                <div className='flex flex-col overflow-hidden'>                   
                    <h2 className='fade-in'>Question:</h2>                 
                    <p className="fade-in">{props.selectQuestion}</p>
                    <h2 className='mt-8 fade-in-1'>Which response is {props.senderNickname}&apos;s?</h2>
                    <button 
                        className={btnStyle1} 
                        onClick={() => {
                            if (!didUserSubmit) {
                                setBtnStyle1("btn-select-selected")
                                setBtnStyle2("btn-select-unselected")  
                                props.setSelectedResponse(props.selectResponse1) 
                            };                 
                        }}
                    >   
                        <div className='bg-red-800 px-6 py-4 border-r-2 rounded-l-2xl flex items-center'>
                            <h2>A</h2>   
                        </div>       
                        <div className='flex items-center text-left'>
                            <p className='p-4 break-normal'>{props.selectResponse1}</p>   
                        </div>                                          
                    </button>
                    <button 
                        className={btnStyle2} 
                        onClick={() => {
                            if (!didUserSubmit) {
                                setBtnStyle2("btn-select-selected")
                                setBtnStyle1("btn-select-unselected")
                                props.setSelectedResponse(props.selectResponse2)   
                            }; 
                        }}
                    >        
                        <div className='bg-blue-800 px-6 py-4 border-r-2 rounded-l-2xl flex items-center'>
                            <h2>B</h2>   
                        </div>       
                        <div className='flex items-center text-left'>
                            <p className='p-4 break-normal'>{props.selectResponse2}</p>   
                        </div>                               
                    </button>
                    {didUserSubmit ? <h1 className='mt-8 py-2 px-4 self-center text-center'>Waiting for others...</h1>
                    :<button className='btn-submit fade-in-4' onClick={() => handleSubmit()} >Submit</button>}   
                </div>
            }             
        </>          
    );

    async function handleSubmit() {
        if (props.selectedResponse.length === 0) {
            alert("Please select a response before submitting.");
            return;
        };

        setDidUserSubmit(true);

        if (props.selectedResponse === props.humanResponse) {
            props.setScore(prev => prev + 1);
        };
                
        await readyCheck(props.gameId, "score");            
    };
};