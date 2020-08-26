import React ,{Component} from 'react'
import Modal from '../../components/Ui/Modal/Modal'
import Aux from '../auxilary'

const errorHandlerGlobal=(WrappedComponent,axios)=>{
    return class extends Component {
        state={
            error:null
        }

        componentWillMount(){  //executes child components render
            this.requestErrorhandler=axios.interceptors.request.use(request=>{
                this.setState({error:null}) //clearing error while sending request
                return request
            })
            this.responseErrorhandler=axios.interceptors.response.use(re=>re,error=>{
                this.setState({error:error})
            })
        }
        componentWillUnmount(){
            //ejects interceptors after component unmounts
            axios.interceptors.request.eject(this.requestErrorhandler)
            axios.interceptors.response.eject(this.responseErrorhandler)
        }
        conformedErrorHandler=()=>{
            //removes error from screen when clicked on backdrop
            this.setState({error:null})
            
        }
            
        render(){
            
            return(
                <Aux>
                    <Modal 
                    show={this.state.error}
                    clickedBackdrop={this.conformedErrorHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent  {...this.props} />
                </Aux>
            )

        }
        
    }
}
export default errorHandlerGlobal