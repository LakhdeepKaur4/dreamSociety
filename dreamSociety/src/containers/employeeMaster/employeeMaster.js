import React,{Component} from 'react';
import {connect} from 'react-redux';
import  UI from '../../components/newUI/superAdminDashboard';
import ImageUploader from 'react-images-upload';
import Spinner from '../../components/spinner/spinner';
import {getCountryName,getStateName,getCityName, getLocationName,getLocation} from '../../actionCreators/locationMasterAction';
import {AddEmployee} from '../../actionCreators/employeeMasterAction';
import {bindActionCreators} from 'redux';
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
        document:'',
        profilePicture:'',
        firstName:'',
        middleName:'',
        lastName:'',
        startDate:'',
        endDate:'',
        CTC:''
    }

    
    onPicChange=(event)=>{
      this.setState({ profilePicture : event.target.files[0]})
       
    

}   
    
onFileChange=(event)=>{

          this.setState({ document: event.target.files[0]})
               
                 
     
    
    
  
    }
    
    componentDidMount(){
        this.props.getLocation();
        this.props.getCountryName();
        this.props.getStateName();
        this.props.getCityName();
        this.props.getLocationName();
      
    }
    submit=(event)=> {
       
        event.preventDefault();
        const data = new FormData()
        data.append('my-file', this.state.document, this.state.document.name)
         console.log(data,"image")
      
        this.props.AddEmployee({...this.state,data})
        this.setState({
            
    state:{
 
        countryId:'',
        countryName: '',
        stateId: '',
        stateName:'',
        cityId: '',
        cityName:'',
        locationName:'',
        document:'',
        profilePicture:'',
        firstName:'',
        middleName:'',
        lastName:'',
        startDate:'',
        endDate:'',
        CTC:''
    }
        }),
        console.log(this.state.countryId,this.state.countryName,   this.state.stateId,   this.state.stateName, this.state.cityId,  this.state.cityName,this.state.locationName, this.state.document,  this.state.profilePicture, this.state.firstName, this.state.middleName,this.state.lastName,this.state.startDate,
            this.state.endDate,
            this.state.CTC)
    }

    onChange =(e)=>{
        this.setState({
        [e.target.name]:e.target.value

        })   
    }
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
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


onLocationChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
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


render(){
let form;

form=
<div>
<form onSubmit={this.submit}>
  <h3 align="center">Employee Master </h3>

  <div>
        <label>Upload Your Image</label>
        <input type="file" accept ="application/.doc" name="document" onChange={this.onPicChange}/>
    </div>

    <div className="row">
    <div className="form-group col-md-4 ">
    <label>First Name</label>
    <input  className="form-control" name="firstName" type="text" onKeyPress={this.OnKeyPresshandler} onChange ={this.onChange}  maxLength={30}/>
    </div>
 
       
    <div className="form-group  col-md-4">
    <label> Middle Name</label>
    <input  className="form-control" type="text" name ="middleName"  onKeyPress={this.OnKeyPresshandler}  onChange ={this.onChange} maxLength={30}/>
    </div>
  
  
    <div className="form-group col-md-4">
    <label> Last Name</label>
    <input  className="form-control" type="text"  name="lastName"  onKeyPress={this.OnKeyPresshandler} onChange ={this.onChange} maxLength={30}/>
    </div>
    </div>

    

    <div className="form-group">

        <label> CTC</label>
        <input type="text" className="form-control" name ="CTC"  onKeyPress={this.OnKeyPressNumber}  onChange ={this.onChange} maxLength={10}/>
    </div>
    <div>
    <div>
                        <label>Country Name</label>
                        <select  required className ="form-control" name="countryName"  onChange={this.onChangeCountry} >
                        <option value="" disabled selected>--Select--</option>
                            {this.getDropdown1(this.props.locationMasterReducer)}
                        </select>
                    </div>



                    <div>    
                        <label>State Name</label>
                        <select  required className ="form-control" name="stateName" onChange={this.onChangeState}>
                        <option value="" disabled selected>--Select--</option>
                            {this.getDropdown2(this.props.locationMasterReducer)}
                        </select>
                    </div>
                    <div>    
                        <label>City Name</label>
                        <select  required className ="form-control"  name="cityName" onChange={this.onChangeCity} >
                        <option value="" disabled selected>--Select--</option>
                            {this.getDropdown3(this.props.locationMasterReducer)}
                        </select>
                    </div>
                    <div>    
                        <label>location</label>
                        <select  required className ="form-control"   onChange={this.onChangeLocation} >
                        <option value="" disabled selected>--Select--</option>
                            {this.getDropdown4(this.props.locationMasterReducer)}
                        </select>
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
            required
          />
        </div>

        <div className="form-group  col-md-6 col-sm-6">
          <label> Event End Date</label>
          <input
            type="date"
            className=" form-control"
            name="endDate"
            placeholder="event end date"
            onChange={this.onChange}
            required
          />
          </div>
          </div>
        <label> upload your ID</label>
        <input  accept='image/*' type="file"  name ="profilePicture" onChange={this.onFileChange}/>
    </div>
    {/* <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onSelect}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> */}

    <button className="btn btn-success mr-2">Submit</button>
    <button className="btn btn-primary">Display Employee Master</button>
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
 return {
     empDetails:state.empDetails,
     locationMasterReducer : state.locationMasterReducer
 }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({AddEmployee,getCountryName,getStateName,getCityName,getLocationName,getLocation},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeMaster)