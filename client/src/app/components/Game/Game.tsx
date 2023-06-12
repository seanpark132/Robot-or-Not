"use client"

import { useState, useEffect } from 'react';
import Loading from './Loading';
import Main from './Main';

export default function Game() {
    const [isLoading, setIsLoading] = useState(true);      
    const [questionArray, setQuestionArray] = useState<string[]>([]);
    const [responseArray, setResponseArray] = useState<string[]>([]);
    const [question, setQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [userResponse, setUserResponse] = useState("");

    useEffect(() => {
        const generate = async () => {
            const questions = await generateQuestions();

            setQuestionArray(questions);
            setQuestion(questions[0]);  
           
            const firstResponse = await generateAIResponse(questions[0])
            setAiResponse(firstResponse);
            setIsLoading(false); 

            const questionsExceptFirst = questions.slice(1);

            for (const question of questionsExceptFirst) {
                const res = await generateAIResponse(question);
                setResponseArray(prev => [...prev, res]);
            };
        };
                 
        generate();
    }, []);       
 
    return (
        <section>         
            {isLoading ? <Loading />: 
             <Main
                questionArray={questionArray}
                responseArray={responseArray}
                question={question}
                aiResponse={aiResponse}
                userResponse={userResponse}
                setQuestion={setQuestion}
                setAiResponse={setAiResponse}                
                setUserResponse={setUserResponse}
             />
            }                  
        </section>       
    );
    
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
};              