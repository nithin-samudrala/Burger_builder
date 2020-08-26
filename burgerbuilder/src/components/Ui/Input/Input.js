import React from 'react' 
import classes from './Input.css'

const input =(props)=>{
    let inputElement=null
    let inputCSSClasses=[classes.inputElement]

    if(!props.valid && props.shouldCheckValidation && props.touched){
        inputCSSClasses.push(classes.invalid)
    }
    switch (props.elmentType){
        case('input'):
            inputElement=<input className={inputCSSClasses.join(' ')} 
                            {...props.elementConfig} value={props.value}
                            onChange={props.changed}/>
            break
        case('textarea'):
            inputElement=<textarea className={inputCSSClasses.join(' ')} 
                            {...props.elementConfig} value={props.value}
                            onChange={props.changed}/>
            break
        case('select'):                     //Handeling dropdown
            inputElement=<select 
                            className={inputCSSClasses.join(' ')}
                            value={props.value}
                            onChange={props.changed}
                            >
                            {props.elementConfig.options.map(option=>(
                                <option 
                                key={option.value}
                                value={option.value}>
                                {option.displayValue}</option>
                            ))}
                            </select>
            break
        default:
            inputElement=<input className={inputCSSClasses.join(' ')} 
                            {...props.elementConfig} value={props.value}
                            onChange={props.changed}/>

    }
    let validationError = null;
    if (!props.valid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementConfig.placeholder} !</p>;
    }
    return(
        <div className={classes.input}>
            <label className={classes.lable}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input