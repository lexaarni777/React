import React from 'react';
import styles from './Car.module.css'
console.log(styles)

export default props => {
    const inputClasses = [styles.input]

    if (props.name !== '') {
        inputClasses.push(styles.green)
    } else {
        inputClasses.push(styles.red)
    }

    if (props.name.length > 4) {
        inputClasses.push(styles.bold)
    }

    return (
        <div className={styles.Car}>
            <h3>Car name: {props.name}</h3>
            <p>Year: {props.year}</p>
            <input
                type='text'
                onChange={props.onChangeName}
                value={props.name}
                className={inputClasses.join(' ')}
            />
            <button onClick={props.onDelete}>Delete</button>
        </div>
    )
}
