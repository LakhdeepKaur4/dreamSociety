import React,{Component}  from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {viewPerson} from '../../actionCreators/personDetailsMasterAction'
class displayPersonDetails extends Component{
componentDidMount(){
    this.props.viewPerson()
}

    render(){
        return(
            <div>hi</div>
        )
    }


}


function mapStateToProps(state){
 return{
     personDetails:state.personDetails
 }   
    
}

function mapDispatchToProps(dispatch){
 return bindActionCreators({viewPerson},dispatch)   
}


export default connect(mapStateToProps,mapDispatchToProps)(displayPersonDetails)