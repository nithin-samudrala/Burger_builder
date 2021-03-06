import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
]


const buildControls=(props)=>(
    <div className={classes.BuildControls}>
        <p>cost: <strong>{props.cost}</strong></p>
        {controls.map(control =>(
            <BuildControl
            key={control.label} 
            label={control.label}
            add={()=>props.add(control.type)}
            remove={()=>props.remove(control.type)}
            disable={props.disabledInfo[control.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >{props.authToken?"order now":"Login To Order"}</button>
    </div>
)

export default buildControls