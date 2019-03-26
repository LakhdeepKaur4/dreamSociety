import React,{Component} from 'react';
import {connect} from 'react-redux';
import  UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import {getCountryName,getStateName,getCityName, getLocationName} from '../../actionCreators/locationMasterAction';
import {AddEmployee} from '../../actionCreators/employeeMasterAction';
import {bindActionCreators} from 'redux';
import DefaultSelect from '../../constants/defaultSelect'
import _ from 'underscore';
import './employeeMaster.css';

class EmployeeMaster extends Component{



    state={
        loading:true,
        countryId:'',
        countryName: '',
        stateId: '',
        stateName:'',
        cityId: '',
        cityName:'',
        locationName:'',
        locationId:'',
        address:'',
        documentOne:null,
        documentTwo:null,
        profilePicture:null,
        firstName:'',
        middleName:'',
        lastName:'',
        startDate:'',
       
        salary:'',
        file:'',
        errors:{}
    }

    
    onPicChange=(event)=>{
        if(!!this.state.errors[event.target.name]){
        
            let errors =Object.assign({},this.state.errors)
            delete  errors[event.target.name]
            this.setState({[event.target.name]:event.target.files,errors});
        }
        else{
      this.setState({ profilePicture : event.target.files[0]})
       
        }

}   

onChange = (e) => {
    if(!!this.state.errors[e.target.name]){
        let errors =Object.assign({},this.state.errors)
        delete  errors[e.target.name]
        this.setState({[e.target.name]:e.target.value,errors});
    }
    else{
this.setState({[e.target.name]:e.target.value});
}
  } 

        
  OnKeyPresshandler(event) {
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

 
    
onFileChange=(event)=>{
       if(!!this.state.errors[event.target.name]){
           let errors =Object.assign({},this.state.errors)
           delete errors[event.target.name]
           this.setState({[event.target.name]:event.target.files[0],errors});

       }
          else{this.setState({ documentOne: event.target.files[0]})
    }
         }

        
FileChange=(event)=>{
    if(!!this.state.errors[event.target.name]){
        let errors =Object.assign({},this.state.errors)
        delete errors[event.target.name]
        this.setState({[event.target.name]:event.target.files[0],errors});
    }
  
    else{
              this.setState({ documentTwo: event.target.files[0]})
             
        }
    }
    
    componentDidMount(){
    
        this.props.getCountryName().then(()=>this.setState({loading:false}));
        this.props.getStateName().then(()=>this.setState({loading:false}))
        this.props.getCityName().then(()=>this.setState({loading:false}))
        this.props.getLocationName().then(()=>this.setState({loading:false}))
      
    }

  

    OnKeyPressNumber(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

 

    submit=(event)=> {
        
        event.preventDefault();
        let errors ={};
        // const { countryId,stateId,cityId,locationId,documentOne,documentTwo,profilePicture,firstName,middleName,lastName,startDate,endDate,CTC }= this.state   
       
        if(!this.state.countryId){
          errors.countryId= "Country Name  can't be empty. "
         }
         if(!this.state.stateId){
          errors.stateId="State Name can't be empty. "
         }
          if(!this.state.cityId){
          errors.cityId ="City Name can't be empty."
         }
         if(!this.state.locationName){
          errors.locationName="Location Name can't be empty."
         }
         if(!this.state.documentOne){
          errors.documentOne ="please select an ID."
         }
         if(!this.state.documentTwo){
            errors.documentTwo ="please select an ID"
         }
         if(!this.state.profilePicture){
          errors.profilePicture =" Profile picture can't be empty."
         }
         if(!this.state.firstName){
         errors.firstName ="First Name can't be empty. "
         }
       
         if(!this.state.lastName){
       errors.lastName ="Last Name can't be empty."
         }
         if(!this.state.salary){
            errors.salary ="salary can't be empty."
              }
              if(!this.state.address){
                errors.address ="Address can't be empty."
                  }
         if(!this.state.startDate){
          errors.startDate =" Start Date can't be empty ."
         }
         
       
         const data = new FormData() 

  this.setState({ errors });
  const isValid = Object.keys(errors).length === 0
  if (isValid) {        
     
      this.setState({loading:true})
   
      data.append('profilePicture',this.state.profilePicture)
        data.append('documentOne',this.state.documentOne, this.state.documentOne.name)
        data.append('documentTwo',this.state.documentTwo, this.state.documentTwo.name)
        data.append('firstName',this.state.firstName)
        data.append('middleName',this.state.middleName)
        data.append('lastName',this.state.lastName)
        data.append('salary',this.state.salary)
        data.append('startDate',this.state.startDate)
        data.append('address',this.state.address)
        data.append('stateId',this.state.stateId)
        data.append('countryId',this.state.countryId)
        data.append('cityId',this.state.cityId)
        data.append('locationId',this.state.locationId)
       
        
          
        this.props.AddEmployee(data).then(()=>this.props.history.push('/superDashboard/displayEmployee'));


    }
    }
 
  
         
    getDropdown1=({country})=>{
        if(country){
            return country.map((items)=>{
                return(
                    <option key={items.countryId} value={items.countryName}>
                    {items.countryName}
                    </option>
                )
            })
        }
    }
    
    onChangeCountry=(event)=>{
        console.log(this.state)
        let selected= event.target.value;
      
        var data = _.find(this.props.locationMasterReducer.country,function(obj){
                        return obj.countryName === selected
           })

           this.props.getStateName(data.countryId)
           this.setState({countryId:data.countryId})
   }  


          
   getDropdown2=({state})=>{
    if(state){
        return state.map((item)=>{
                return(
                    <option key={item.stateId} value={item.stateName}>
                    {item.stateName}</option>
                )
                
            })

            
        
    }
}

onChangeState= (event)=>{
  
    let selected= event.target.value;
          
    var data1 = _.find(this.props.locationMasterReducer.state,function(obj){
        return obj.stateName === selected
        })
        
       this.props.getCityName(data1.stateId)
       this.setState({stateId:data1.stateId})
    
    }

getDropdown3=({city})=>{
    if(city){
        return city.map((item)=>{
                return(
                    <option key={item.cityId} value={item.cityName} >
                    {item.cityName}</option>
                )
                
            })
    }
}

onChangeCity=(event)=>{
    let selected= event.target.value;     
    
    var data2 = _.find(this.props.locationMasterReducer.city,function(obj){
        return obj.cityName === selected
        })
        
      this.props.getLocationName(data2.cityId)

       this.setState({cityId:data2.cityId})
}


onLocationChange=(event)=>{
    let selected= event.target.value
    console.log(selected)
        var data3 = _.find(this.props.locationMasterReducer.location,function(obj){
            return obj.locationName === selected
            })
        
            console.log(data3)
            this.setState({
                locationName:data3.locationName,
                locationId:data3.locationId
            })

         

}


  getDropdown4=({location})=>{
   
if(location){
    return location.map((item)=>{
        return(
            <option key={item.locationId}>{item.locationName}</option>
        )
    })
}
  }

 
    OnKeyPressNumber(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
  displayEmployee=()=>{
      this.props.history.push('/superDashboard/displayEmployee');
  }

  changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
 }

render(){
let form;
<Spinner/>

let formData=<div>
<h3 align="center">Employee Master </h3>

  <div className="input-container">
        <label for ="upload-photo">Select Your Image</label>
        <input type="file" accept =".png, .jpg, .jpeg"   data-max-size="4194304"   name="profilePicture" onChange={this.onPicChange}/>
         
        <span className="error">{this.state.errors.profilePicture}</span>
    </div>

    <div className="row">
    <div className="form-group col-md-4 ">
    <label>First Name</label>
    <input  className="form-control" name="firstName" type="text"  onChange ={this.onChange}  maxLength={30}/>
     
    <span className="error">{this.state.errors.firstName}</span>
    </div>
 
       
    <div className="form-group  col-md-4">
    <label> Middle Name</label>
    <input  className="form-control" type="text" name ="middleName"  onKeyPress={this.OnKeyPresshandler}  onChange ={this.onChange} maxLength={30}/>
    <span className="error">{this.state.errors.middleName}</span>
    </div>
  
  
    <div className="form-group col-md-4">
    <label> Last Name</label>
    <input  className="form-control" type="text"  name="lastName"  onKeyPress={this.OnKeyPresshandler} onChange ={this.onChange} maxLength={30}/>
    <span className="error">{this.state.errors.lastName}</span>
    </div>
    </div>

    

    <div className="form-group">

        <label> Salary</label>
       
        <input type="text" className="form-control" name ="salary" onChange ={this.onChange} maxLength={20}/>
        <span className="error">{this.state.errors.salary}</span>
    </div>
    <div  className="row">
                    <div className="col-md-6">
                            <label>Country Name</label>
                           <select   className ="form-control" name="countryId"         defaultValue='no-value' onChange={this.onChangeCountry} >
                        <    DefaultSelect/> 
                            {this.getDropdown1(this.props.locationMasterReducer)}
                        </select>
                           {!this.state.countryId?<span className="error">{this.state.errors.countryId}</span>:''}
                    </div>



                    <div className="col-md-6">    
                        <label>State Name</label>
                        <select  className ="form-control"  defaultValue='no-value'  name="stateName" onChange={this.onChangeState}>
                               <DefaultSelect/>
                            {this.getDropdown2(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.stateId?<span className="error">{this.state.errors.stateId}</span>:''}
                    </div>
                          </div>
                          <div className="row">    
                      <div  className="col-md-6">    
                        <label>City Name</label>
                        <select  className ="form-control" defaultValue='no-value'  name="cityName" onChange={this.onChangeCity} >
                            <DefaultSelect/>
                            {this.getDropdown3(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.cityId?<span className="error">{this.state.errors.cityId}</span>:''}
                     </div>
                     <div  className="col-md-6" >    
                        <label>location</label>
                        <select  className ="form-control" name="locationName" defaultValue='no-value' onChange={this.onLocationChange} >
                             <DefaultSelect/>
                            {this.getDropdown4(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.locationName?<span className="error">{this.state.errors.locationName}</span>:''}
                      </div>
                     </div>
                      

              <div className="form-group">
                <label> Address</label>
                <input type="text" className="form-control" name ="address"   onChange ={this.onChange} maxLength={30}/>
                <span className="error">{this.state.errors.address}</span>
              </div>


        <div className="form-group">
          <label> Employment  Date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            onChange={this.onChange}
            />
          <span className="error">{this.state.errors.startDate}</span>
        </div>

     

          <div className ="row">
          <div className=" input-contain  col-md-4">
          <label> upload your ID</label>
         <input  accept='.docx ,.doc,application/pdf' type="file"  name ="documentOne" onChange={this.onFileChange}/>
        <span className="error">{this.state.errors.documentOne}</span>
        </div>

    
   
        <div  className="input-contain  col-md-1">
        <label> upload your ID</label>  
        <input  accept='.docx,application/pdf' type="file" name ="documentTwo" onChange={this.FileChange}/>
        <span className="error">{this.state.errors.documentTwo}</span>
        </div>
        </div>
<div style={{paddingTop:"30px"}}>
  <button className="btn btn-success mr-2">Submit</button>
  <button className="btn btn-danger"  onClick ={this.displayEmployee}>Cancel</button>
  </div>
  </div>






  
// else if(this.submit){
//     form =<Spinner/>
// }

    return(
        <div  >
            <UI   onClick ={this.logout } change={this.changePassword}>
            <form onSubmit={this.submit}>
  
   
 
  {!this.state.loading ? formData: <Spinner />} 
  </form>
        </UI>
        </div>
        
    )
}

}

function mapStateToProps(state){
    console.log("location", state)
 return {
     empDetails:state.empDetails,
     locationMasterReducer : state.locationMasterReducer
     
 }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({AddEmployee,getCountryName,getStateName,getCityName,getLocationName},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeMaster)