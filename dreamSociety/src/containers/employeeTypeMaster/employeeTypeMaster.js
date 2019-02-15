import React,{Component} from 'react';
import {connect} from  'react-redux';
import {bindActionCreators}  from 'redux';
import UI from '../../components/newUI/superAdminDashboard';

import Spinner from '../../components/spinner/spinner';
import {AddEmployee,getEmployeeType,getEmployeeWorkType} from '../../actionCreators/employeeTypeMasterAction';
class EmployeeTypeMaster extends Component{
    state ={
        serviceType:'',
        employeeTypeId:'',
        employeeType:'',
        employeeWorkTypeId:'',
        employeeWorkType:'',
        loading:true
    }

         
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    componentDidMount(){
        console.log(this.props.getEmployeeType());
        this.props.getEmployeeType().then(()=> this.setState({loading:false}))
        this.props.getEmployeeWorkType().then(()=> this.setState({loading:false}))
    }


getEmpType({employeeType}){
    console.log(employeeType,"emptype");
    if(employeeType){
        return(
            employeeType.employeeType.map((item)=>{
                return(
                    <option key={item.employeeTypeId} value ={item.employeeTypeId} > 
                    {item.employeeType}
                    </option>
                )
            })
        )
    }
}

getEmpWorkType({employeeWorkType}){
console.log(employeeWorkType,"emp")
if(employeeWorkType){
    return(
        employeeWorkType.employeeWorkType.map((item)=>{
            return(
                <option key={item.employeeWorkTypeId} value ={item.employeeWorkTypeId}>
                {item.employeeWorkType}
                </option>
            )
        })
    )
}

}

onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
    console.log(this.state.serviceType)
  }


  submit=(e)=>{
    this.setState({loading:true})
      e.preventDefault();
      
      this.props.AddEmployee({...this.state}).then(()=>this.props.history.push('/superDashboard/displayEmployeeType'))
       this.setState({serviceType:'',employeeTypeId:'',employeeWorkTypeId:''})
    console.log(this.state.serviceType,this.state.employeeTypeId,this.state.employeeWorkTypeId)
  }

  displayEmployee=()=>{
    
    this.props.history.push('/superDashboard/displayEmployeeType')
}


render(){
    let form1;
    if(!this.state.loading && this.props.employeeDetails.employeeType && this.props.employeeDetails.employeeWorkType){
    form1=
    <div>
    <form onSubmit={this.submit}>
    <div>
         <h3 align="center">Employee Type Master</h3>
        <div className="form-group">
        <label>Employee Type</label>
    <select  className="form-control" name ="employeeTypeId"    onChange={(e)=>
       
        {this.setState({employeeTypeId:e.target.value})}
        } >
         {this.getEmpType(this.props.employeeDetails)}
        </select>
        </div>
        <div  className="form-group">
        <label>Employee  Work Type</label>
    <select  className="form-control" name="employeeWorkTypeId"  onChange={(e)=>{

        this.setState({employeeWorkTypeId:e.target.value})}}>
        {this.getEmpWorkType(this.props.employeeDetails)}
        </select>
        </div>
    <div  className="form-group">
    <label>Employee Service Type</label>
    <input type ="text" className="form-control" name="serviceType" placeholder="Service Type"  onChange={this.onChange} onKeyPress={this.OnKeyPresshandler}/>
    </div>
    <button className="btn btn-success">Submit</button>
    <button className="btn btn-danger" onClick={this.displayEmployee}>Cancel</button>
    </div>
    </form>
</div>
}
else if(this.submit){
    form1 =<Spinner/>
}

    return(
      <div>
          <UI>
              {form1}
          </UI>

      </div>
    )
}

}

function mapStateToProps(state){
    return{
     employeeDetails:state.employeeDetails
    }
}
function mapDispatchToProps(dispatch){
    console.log(AddEmployee,"addEmp")
return bindActionCreators({AddEmployee,getEmployeeType,getEmployeeWorkType},dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeTypeMaster)