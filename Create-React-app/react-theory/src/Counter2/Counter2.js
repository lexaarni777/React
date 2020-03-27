import React from 'react'
export default props => {
    return(
        <div>
            {console.log(props.clicked)}
            <h3>Counter 2</h3>
            {props.clicked ? <p>Clicked</p> : null}
        </div>
    )
}