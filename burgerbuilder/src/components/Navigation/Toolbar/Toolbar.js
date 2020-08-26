import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import Backdrop from '../../Ui/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

const toolbar=(props)=>{
    // let abc=classes.menuButton
    // if(props.showMenu){
    //     abc=[classes.menuButton,]
    // }
    return(
    <div>
        <header className={[classes.Toolbar,props.showMenu ? classes.show:null].join(' ')} >
            <div 
                className={classes.menuButton}
                onClick={props.menuButtonClicked}
                show={props.showMenu}>
                    <div id={classes.lineOne}></div>
                    <div id={classes.lineTwo}></div>
                    <div id={classes.lineThree}></div>
            </div>
            
            <Logo className={classes.img}></Logo>
            <nav className={classes.laptop}>
                <ul>
                    <li><NavLink to='/' 
                            activeClassName={classes.active}
                            exact >Burger Builder</NavLink>
                    </li>
                    <li><NavLink to={props.authToken?'/orders':'/' } exact
                            activeClassName={classes.active}>Orders</NavLink>
                    </li>
                    <li>
                        {props.authToken?
                            <NavLink to='/logout'
                                activeClassName={classes.active}>Logout</NavLink>
                                :
                            <NavLink to='/auth'
                                activeClassName={classes.active}>Login</NavLink>
                        }
                    </li>
                    
                </ul>
            </nav>
            <nav onClick={props.menuButtonClicked} className={classes.mobile}>
                <ul>
                    <li><NavLink to='/' 
                            activeClassName={classes.active}
                            exact >Burger Builder</NavLink>
                    </li>
                    <li><NavLink to={props.authToken?'/orders':'/' } exact
                            activeClassName={classes.active}>Orders</NavLink>
                    </li>
                    <li>
                        {props.authToken?
                            <NavLink to='/logout'
                                activeClassName={classes.active}>Logout</NavLink>
                                :
                            <NavLink to='/auth'
                                activeClassName={classes.active}>Login</NavLink>
                        }
                    </li>
                    
                </ul>
            </nav>
        </header>
        <Backdrop 
                clicked={props.menuButtonClicked}
                show={props.showMenu}
                />
    </div>
    )
}

export default toolbar