import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTower,getFlat,getRoles,addPerson} from '../../actionCreators/personDetailsMasterAction';
import Spinner from '../../components/spinner/spinner'
import DefaultSelect from '../../constants/defaultSelect';
import UI from '../../components/newUI/superAdminDashboard';

 class PersonDetails extends Component{
constructor(props){
    super(props)
this.state={
    userName:'',
    email:'',
  
    towerId:'',

    flatDetailId:'',    
  roles:'',

              
menuVisible: false  ,      
    familyMember:'',
    parking:'',
    loading:true
}                              

}

OnKeyPresshandler(event) {
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}
componentDidMount(){

 
    this.props.getTower().then(()=> this.setState({loading:false}))
    // this.props.getFlat()
    this.props.getRoles().then(()=> this.setState({loading:false}))
    
}

OnKeyPressNumber(event) {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

OnKeyPressmail(event){
    const pattern = /^[a-zA-Z0-9@._]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

onChange=(e)=>{
this.setState({[e.target.name]:e.target.value});
}



submit=()=>{
    this.setState({loading:true})


this.props.addPerson({...this.state})
.then(()=>
this.props.history.push('/superDashboard/displayPerson')
);
            
}


getRole({roles}){
    console.log(roles,'sdfasfsdf')
    if(roles){
        return(
            roles.map((item)=>{
                return(
                <option key={item.id} value={item.roleName}>{item.roleName} </option>
                )
            })
        )
    }

}


Tower({get}){
    console.log('abcd',get)
    if(get){
        return(
  get.map((item)=>{
      return(

      <option key={item.towerId} value={item.towerId}> {item.towerName} </option>
  )
  })
  )
  }
}


person=()=>{
    this.props.history.push('/superDashboard/displayPerson')
}


    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }


    render() {
let form1;
  if(!this.state.loading && this.props.personDetails.get && this.props.personDetails.roles){
form1 = <form onSubmit={this.submit}>
  <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

      <h3 align="center">  Add Person </h3>
            <div className="form-group">
                <label>
                    Username
                    
</label>
<input type="text" name="userName" onChange={this.onChange} maxLength={30} className="form-control" onKeyPress={this.OnKeyPresshandler} required />
</div>
<div   className="form-group">
<label>
Email
</label>
<input type="email"  name="email"  onChange={this.onChange} maxLength={50}    className="form-control"  onKeyPress ={this.OnKeyPressmail} required/>
</div> 
<div className="form-group">
<label> Roles</label>
<select  name="roles"      defaultValue='no-value'  onChange={(e)=>{this.setState({roles:e.target.value })}}    className="form-control"  required>
<DefaultSelect/>
{this.getRole(this.props.personDetails)}

</select>
</div  >  
<div   className="form-group">
<label>Tower</label>
<select  name="towerId"       defaultValue='no-value' className="form-control" onChange ={(e)=>{this.setState({towerId:e.target.value})}}>
<DefaultSelect/>
{this.Tower(this.props.personDetails)}
</select>
</div>
<div   className="form-group">
<label> Number of members in family</label>
<input type="text"  name ="familyMember"  className="form-control" maxLength ={2}  onChange={this.onChange} onKeyPress ={this.OnKeyPressNumber} required/>

</div>
<div   className="form-group">
<label> parking</label>
<input  type="text"   name ="parking" className="form-control" maxLength ={2} onChange={this.onChange}    onKeyPress ={this.OnKeyPressNumber}  required />
</div>
<button className="btn btn-success"> Submit</button>
<button   className ="btn btn-danger" onClick={this.person}>Cancel</button> 
</form>  
     
  }
  else if(this.submit){
      form1 =<Spinner/>
  }
        return (
            <div>
                <UI onClick={this.logout}>
                 {form1} 

                 
             </UI>
             </div>
    )
}
}


function mapStateToProps(state){
    console.log(state)
return{
    personDetails :state.personDetails
}
}

function mapDispatchToProps(dispatch){
return bindActionCreators({getTower,getFlat,getRoles,addPerson},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PersonDetails)