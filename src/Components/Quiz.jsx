import './Quiz.css'
import { useState,useRef } from 'react';
import { data } from '../assets/data';

export default function Quiz() {

    let [index,setIndex]= useState(0);
    let [question,setQuestion]= useState(data[index]);
    let [lock,setLock]= useState(false);
    let [score,setScore]= useState(0);
    let [result,setResult]= useState(false); 

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);
    
    let option_array = [option1,option2,option3,option4];

    const checkAns = (e,answer) => {
        if(lock == false){
             if (question.answer===answer){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.answer-1].current.classList.add("correct");
            }
        }
    }

    const next = () =>{
        if(lock== true){

            if(index === data.length-1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }
    
    let message = "";

    if(score === 5){
    message = "🎉 Congratulations! You got 5 out of 5 🎉";
    }
    else if(score === 4){
    message = "🔥 So Close! You got 4 out of 5";
    }
    else if(score === 3){
    message = "👍 Good Progress! You got 3 out of 5";
    }
    else if(score === 2){
    message = "💪 Keep it Up! You got 2 out of 5";
    }
    else if(score === 1){
    message = "✨ You Can Do It Next Time! You got 1 out of 5";
    }
    else{
    message = "🙂 Better Luck Next Time! You got 0 out of 5";
    }



    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result ? <></> : <><h2>
               {index+1}. {question.questions} 
            </h2>
            <ul>
                <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">{index+1} of {data.length} questions</div>
            </>}

            {result ?
                <> <h2>{message}</h2>

                {score === 5 &&
                    <div className="celebration">
                        🎊 🎉 🏆 🎉 🎊
                    </div>
                }

            <button onClick={reset}>Reset</button>
            </> : <></>}
           
            
        </div>
    )
}