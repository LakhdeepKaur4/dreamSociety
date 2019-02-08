import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTower,getFlat,getRoles,addPerson} from '../../actionCreators/personDetailsMasterAction';
import './personDetails.css';
import {Link} from 'react-router-dom';
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
    
}                              

}

OnKeyPresshandler(event) {
    const pattern = /[a-zA-Z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}
componentDidMount(){

    console.log(   this.props.getRoles(),"mnsssss")
    this.props.getTower()
    this.props.getFlat()
    this.props.getRoles()
    
}

OnKeyPressNumber(event) {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

onKeyPressmail(event){
    const pattern = /^[a-zA-Z]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

onChange=(e)=>{
this.setState({[e.target.name]:e.target.value});
}

// Flat({flat1}){
//     console.log('xyz',flat1)
// if(flat1){
//     return(
//         flat1.map((item)=>{
//             return(
//                 <option key={item.flatId} value ={item.flatId}>{item.flatType}</option>
//             )
//         })
//     )
// }

// }

submit=(e)=>{
e.preventDefault();

this.props.addPerson({...this.state}),
this.props.history.push('/superDashboard/displayPerson')
console.log(this.state,'adsdfskjfss');  
            
}

// submit=(e)=>{
//     e.preventDefault();
//     console.log(this.state.eventOrganiser);
//     this.props.AddEvent({...this.state})
//     this.setState({
//       state:{
//         eventType: [],  
//     eventName:[],
//     eventOrganiser:[],
//     startDate:[],
//     endDate:[],

//       }
//     }
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



    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    render() {
        return (
            <div>
                {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
    <div style={{ margin: '48px auto' }}>
        <SideBar onClick={() => this.setState({ menuVisible: false })}
         visible={this.state.menuVisible}> */}
                <UI onClick={this.logout}>


                    <div className="person" >
                        <form onSubmit={this.submit}>
                            <div className="form-group">
                                <label>
                                    Username
                                    
</label>
<input type="text" name="userName" onChange={this.onChange} maxLength={20} className="form-control" onKeyPress={this.OnKeyPresshandler} required />
        </div>
   <div   className="form-group">
<label>
Email
</label>
<input type="email"  name="email"  onChange={this.onChange} maxLength={30}    className="form-control"  onKeyPress ={this.OnKeyPressmail} required/>
        </div> 
        <div className="form-group">
            <label> Roles</label>
<select  name="roles"  onChange={(e)=>{this.setState({roles:e.target.value })}}    className="form-control"  required>

{this.getRole(this.props.personDetails)}

</select>
        </div  >  
<div   className="form-group">
    <label>Tower</label>
    <select  name="towerId"  className="form-control" onChange ={(e)=>{this.setState({towerId:e.target.value})}}>
    {this.Tower(this.props.personDetails)}
    </select>
</div>
        {/* <div  className="form-group">
            <label> Flat Number</label>
            <select name="flatDetailId"   onChange={(e)=>{this.setState({flatDetailId:e.target.value})}}     className="form-control" >
            {this.Flat(this.props.personDetails)}
            </select>
            </div> */}
{/* <div   className="form-group">
    <label>floor</label>
    <input type="text" name="floor" className="form-control" onChange={this.onChange}  onKeyPress={this.OnKeyPresshandler}required />
    </div>       */}
    <div   className="form-group">
        <label> Number of members in family</label>
        <input type="text"  name ="familyMember"  className="form-control" maxLength ={5}  onChange={this.onChange} onKeyPress ={this.OnKeyPressNumber} required/>
       
        </div>
        <div   className="form-group">
            <label> parking</label>
            <input  type="text"   name ="parking" className="form-control" maxLength ={3} onChange={this.onChange}    onKeyPress ={this.OnKeyPressNumber}  required />
        </div>
        <button className="btn btn-primary"> Submit</button>
        <Link color="primary" to="/superDashboard/displayPerson">Person details</Link>
        </form>       
         
             </div>
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