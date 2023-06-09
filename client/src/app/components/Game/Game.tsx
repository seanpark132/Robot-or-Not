"use client"

import { useState, useEffect } from 'react';
import Loading from './Loading';
import Main from './Main';

export default function Game() {
    const [isLoading, setIsLoading] = useState(true);      
    const [questionArray, setQuestionArray] = useState<string[]>([]);
    const [question, setQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [userResponse, setUserResponse] = useState("");

    function generateQuestions() { 
        return (
            fetch('../api/generateQuestion', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(json => json.response)
        );  
    };

    function generateAIResponse(question: string) {
        return (
            fetch('../api/generateResponse', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: question })
            })
            .then(res => res.json())
            .then(json => json.response)
        )
    };
  
    useEffect(() => {
        generateQuestions().then(questions => {
            setQuestionArray(questions);
            setQuestion(questions[0]);  
           
            generateAIResponse(questions[0]).then(res => {
                setAiResponse(res);
                setIsLoading(false); 
            })
        });   
    }, []);    
 
    return (
        <section>         
            {isLoading ? <Loading />: 
             <Main
                question={question}
                aiResponse={aiResponse}
                userResponse={userResponse}
                setUserResponse={setUserResponse}
             />
            }                  
        </section>       
    );
};              