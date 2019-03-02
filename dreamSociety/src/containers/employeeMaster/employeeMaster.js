import React,{Component} from 'react';
import {connect} from 'react-redux';
import  UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import {getCountryName,getStateName,getCityName, getLocationName} from '../../actionCreators/locationMasterAction';
import {AddEmployee} from '../../actionCreators/employeeMasterAction';
import {bindActionCreators} from 'redux';
import DefaultSelect from '../../constants/defaultSelect'
import _ from 'underscore';

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
        documentOne:null,
        documentTwo:null,
        profilePicture:null,
        firstName:'',
        middleName:'',
        lastName:'',
        startDate:'',
        endDate:'',
        CTC:'',
        file:'',
        errors:{}
    }

    
    onPicChange=(event)=>{
      this.setState({ profilePicture : event.target.files[0]})
       
    

}   
    
onFileChange=(event)=>{
console.log('jjjjjjjjjjjj',event);

          this.setState({ documentOne: event.target.files[0]})
         }

        
FileChange=(event)=>{
  
    
              this.setState({ documentTwo: event.target.files[0]})
             
        }
    
    componentDidMount(){
    
        this.props.getCountryName();
        this.props.getStateName();
        this.props.getCityName();
        this.props.getLocationName();
      
    }

    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
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
          errors.serviceType  = " service Type  can't be empty. Please select."
         }
         if(!this.state.stateId){
          errors.stateId ="State Name can't be empty. Please select"
         }
          if(!this.state.cityId){
          errors.cityId ="city Name can't be empty. Please select"
         }
         if(!this.state.locationId){
          errors.locationId ="location Name can't be empty. Please Select"
         }
         if(!this.state.documentOne){
          errors.documentOne ="please select an ID."
         }
         if(!this.state.documentTwo){
            errors.documentTwo ="please select an ID"
         }
         if(!this.state.profilePicture){
          errors.profilePicture =" profile picture can't be empty.please select "
         }
         if(!this.state.firstName){
         errors.firstName ="first Name can't be empty. please select"
         }
       
         if(!this.state.lastName){
       errors.lastName ="last Name can't be empty.please select"
         }
         if(!this.state.startDate){
          errors.startDate =" start Date can't be empty .please select"
         }
         if(!this.state.endDate){
         errors.endDate ="end Date can't be empty. please select"
         }
         if(!this.state.CTC){
        errors.CTC ="CTC can't be empty. please select"
         }
          
         const data = new FormData()
  this.setState({ errors });
  const isValid = Object.keys(errors).length === 0
  if (isValid) {        
     

      
        data.append('documentOne',this.state.documentOne, this.state.documentOne.name)
        data.append('documentTwo',this.state.documentTwo, this.state.documentTwo.name)
        data.append('firstName',this.state.firstName)
        data.append('middleName',this.state.middleName)
        data.append('lastName',this.state.lastName)
        data.append('CTC',this.state.CTC)
        data.append('startDate',this.state.startDate)
        data.append('endDate',this.state.endDate)
        data.append('stateId',this.state.stateId)
        data.append('countryId',this.state.countryId)
        data.append('cityId',this.state.cityId)
        data.append('locationId',this.state.locationId)
        data.append('profilePicture',this.state.profilePicture)
        
          
        this.props.AddEmployee(data)


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
      console.log(location)
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

  displayEmployee=()=>{
      this.props.history.push('/superDashboard/displayEmployee');
  }
render(){
let form;

form=
<div>
<form onSubmit={this.submit}>
  <h3 align="center">Employee Master </h3>

  <div>
        <label for ="upload-photo">Select Your Image</label>
        <input type="file" accept ="image/*" name="profilePicture" onChange={this.onPicChange}/>
        <span className="error">{this.state.errors.profilePicture}</span>
    </div>

    <div className="row">
    <div className="form-group col-md-4 ">
    <label>First Name</label>
    <input  className="form-control" name="firstName" type="text" onKeyPress={this.OnKeyPresshandler} onChange ={this.onChange}  maxLength={30}/>
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

        <label> CTC</label>
       
        <input type="text" className="form-control" name ="CTC"  onKeyPress={this.OnKeyPressNumber}  onChange ={this.onChange} maxLength={3}/>
        <span className="error">{this.state.errors.CTC}</span>
    </div>
    <div>
    <div>
                        <label>Country Name</label>
                        <select   className ="form-control" name="countryName"         defaultValue='no-value' onChange={this.onChangeCountry} >
                        < DefaultSelect/> 
                            {this.getDropdown1(this.props.locationMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.countryId}</span>
                    </div>



                    <div>    
                        <label>State Name</label>
                        <select  className ="form-control"         defaultValue='no-value'  name="stateName" onChange={this.onChangeState}>
                    <DefaultSelect/>
                            {this.getDropdown2(this.props.locationMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.stateId}</span>
                    </div>
                    <div>    
                        <label>City Name</label>
                        <select  className ="form-control"        defaultValue='no-value'  name="cityName" onChange={this.onChangeCity} >
                       <DefaultSelect/>
                            {this.getDropdown3(this.props.locationMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.cityId}</span>
                    </div>
                    <div>    
                        <label>location</label>
                        <select  className ="form-control"          defaultValue='no-value' onChange={this.onLocationChange} >
                   <DefaultSelect/>
                            {this.getDropdown4(this.props.locationMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.locationId}</span>
                    </div>

        <div className="row">
        <div className="form-group col-md-6 col-sm-6">
          <label> Start Date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            placeholder=" event start date"
            onChange={this.onChange}
            
          />
          <span className="error">{this.state.errors.startDate}</span>
        </div>

        <div className="form-group  col-md-6 col-sm-6">
          <label> Event End Date</label>
          <input
            type="date"
            className=" form-control"
            name="endDate"
            placeholder="event end date"
            onChange={this.onChange}
             />
             <span className="error">{this.state.errors.endDate}</span>
          </div>
          </div>
        <label> upload your ID</label>
        <input  accept='.docx ,.doc,application/pdf' type="file"      name ="documentOne" onChange={this.onFileChange}/>
        <span className="error">{this.state.errors.documentOne}</span>
    </div>
  
    <div>
        <label> upload your ID</label>
        <input  accept='.docx,application/pdf' type="file"       name ="documentTwo" onChange={this.FileChange}/>
        <span className="error">{this.state.errors.documentTwo}</span>
    </div>
   

    <button className="btn btn-success mr-2">Submit</button>
    <button className="btn btn-primary"  onClick ={this.displayEmployee}>Display Employee Master</button>
    </form>
    </div>


// else if(this.submit){
//     form =<Spinner/>
// }

    return(
        <div>
            <UI>
          {form}
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