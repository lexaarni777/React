import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
const successCount = Object.keys(props.rezults).reduce((total, key)=>{
    if(props.rezults[key]==='success'){
        total++
    }
    return total
}, 0)

    return(
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index)=>{
                    const cls = [
                        'fa',
                        props.rezults[quizItem.id] === 'error'
                        ? 'fa-times' 
                        : 'fa-check',
                        classes[props.rezults[quizItem.id]]
                    ]


                    return(
                        <li
                            key={index}
                        >
                            <strong>{index+1}</strong>.
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                })}
            </ul>
            {console.log(props.quiz)}
            <p>{successCount} из {props.quiz.length}</p>

            <div>
                <button onClick={props.onRetry}>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz