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
        file:''
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
    submit=(event)=> {
        
        event.preventDefault();
                  
     
        console.log("test12332",this.state.documentOne)  
        console.log("test2321",this.state.documentTwo)   
          
        const data = new FormData()
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
         console.log(data,"image")
         
      
          console.log("test12332",this.state.firstName)     

        //   axios.post(`${URN}/employee`,data,{headers:authHeader(),config})
          
        this.props.AddEmployee(data)
    //     this.setState({
            
    // state:{
 
    //     countryId:'',
    //     countryName: '',
    //     stateId: '',
    //     stateName:'',
    //     cityId: '',
    //     cityName:'',
    //     locationName:'',
    //     document:'',
    //     profilePicture:'',
    //     firstName:'',
    //     middleName:'',
    //     lastName:'',
    //     startDate:'',
    //     endDate:'',
    //     CTC:''
    // }
    //     }),
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

            // this.props.getSociety(data3.locationId)

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


render(){
let form;

form=
<div>
<form onSubmit={this.submit}>
  <h3 align="center">Employee Master </h3>

  <div>
        <label>Upload Your Image</label>
        <input type="file" accept ="image/*" name="file" onChange={this.onPicChange}/>
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
                        <select   className ="form-control" name="countryName"  onChange={this.onChangeCountry} >
                        < DefaultSelect/> 
                            {this.getDropdown1(this.props.locationMasterReducer)}
                        </select>
                    </div>



                    <div>    
                        <label>State Name</label>
                        <select  className ="form-control" name="stateName" onChange={this.onChangeState}>
                    <DefaultSelect/>
                            {this.getDropdown2(this.props.locationMasterReducer)}
                        </select>
                    </div>
                    <div>    
                        <label>City Name</label>
                        <select  className ="form-control"  name="cityName" onChange={this.onChangeCity} >
                       <DefaultSelect/>
                            {this.getDropdown3(this.props.locationMasterReducer)}
                        </select>
                    </div>
                    <div>    
                        <label>location</label>
                        <select  className ="form-control"   onChange={this.onLocationChange} >
                   <DefaultSelect/>
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
            
          />
          </div>
          </div>
        <label> upload your ID</label>
        <input  accept='.docx ,.doc,application/pdf' type="file"      name ="documentOne" onChange={this.onFileChange}/>
    </div>
  
    <div>
        <label> upload your ID</label>
        <input  accept='.docx,application/pdf' type="file"       name ="documentTwo" onChange={this.FileChange}/>
    </div>
   

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
    return bindActionCreators({AddEmployee,getCountryName,getStateName,getCityName,getLocationName},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeMaster)