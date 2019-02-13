import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getCountryName,getStateName,getCityName,addLocationDetails, getLocationName,getLocation} from '../../actionCreators/locationMasterAction';
import _ from 'underscore';
import UI from '../../components/newUI/superAdminDashboard';
import { Button, Form ,FormGroup, Input, Label } from 'semantic-ui-react';


class locationMaster extends Component{
    constructor(props){
        super(props);
        this.state={ 

            countryId:'',
            countryName: '',
            stateId: '',
            stateName:'',
            cityId: '',
            cityName:'',
            locationName:''
        }
    }

    

    componentDidMount(){
        this.props.getLocation();
        this.props.getCountryName();
        this.props.getStateName();
        this.props.getCityName();
        this.props.getLocationName();
      
    }
    
    refreshData(){
        this.props.addLocationDetails();
    }
           


    getDropdown1=({country})=>{
        console.log(country,"abc")
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

        console.log(selected)
      
        var data = _.find(this.props.locationMasterReducer.country,function(obj){
                        return obj.countryName === selected
           })
   
           console.log(data)

           this.props.getStateName(data.countryId)
           this.setState({countryId:data.countryId})
   }  

        
    getDropdown2=({state})=>{
        console.log("stateResult", state)
        if(state){
            return state.map((item)=>{
                console.log("state",item.stateId)
                    return(
                        <option key={item.stateId} value={item.stateName}>
                        {item.stateName}</option>
                    )
                    
                })

                
            
        }
    }

    onChangeState= (event)=>{
      
        let selected= event.target.value;
     
        console.log("selected",selected)
       
        
        var data1 = _.find(this.props.locationMasterReducer.state,function(obj){
            return obj.stateName === selected
            })
    
            console.log("data1",data1)
            
           this.props.getCityName(data1.stateId)
           this.setState({stateId:data1.stateId})
        
        }

    getDropdown3=({city})=>{console.log("cityResult",city)
        if(city){
            return city.map((item)=>{
                console.log("city",item.cityId)
                    return(
                        <option key={item.cityId} value={item.cityName} >
                        {item.cityName}</option>
                    )
                    
                })
        }
    }

    onChangeCity=(event)=>{
        let selected= event.target.value;
     
        console.log("selected",selected)
       
        
        var data2 = _.find(this.props.locationMasterReducer.city,function(obj){
            return obj.cityName === selected
            })
    
            console.log("data2",data2)
            
          this.props.getLocationName(data2.cityId)

           this.setState({cityId:data2.cityId})
    }

    onLocationChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    push=()=>{
        this.props.history.push('/superDashboard/displayLocation')
    }

    onSubmit=(event)=> {
       
        event.preventDefault();
   
        this.props.addLocationDetails(this.state)
        console.log("submit",this.state);
        
        this.setState(
        {
            state: {
                locationId:'',
                countryId:'',    
                stateId: '',        
                cityId: '',             
                locationName:''
             
                }
                 
        })  
        this.props.history.push('/superDashboard/displayLocation')
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }



    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    
    render (){
        return(
            <div>
            <UI onClick={this.logout}>
            <div>
                <form onSubmit={this.onSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Location</h3></div>
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
                        <label>Location Name</label>
                        <input  type="text" placeholder="Location Name" className ="form-control" name="locationName" maxLength={30}  onKeyPress={this.OnKeyPressUserhandler} value={this.state.locationName}  onChange={this.onLocationChange} required></input>
                    </div>
             
                    <div className="mt-4">
                            <button type="submit" className=" btn btn-success mr-2" value="submit">Submit</button>
                          
                                <button className=" btn btn-danger" onClick={this.push}>Cancel</button>
                       
                        </div>
                </form> 
                
            </div>
            </UI>
            </div>
        )
    }

}

function mapStateToProps(state){
    return{
    locationMasterReducer : state.locationMasterReducer
            }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCountryName,getStateName,getCityName,getLocationName,addLocationDetails,getLocation},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(locationMaster);