import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getCountryName,getStateName,getCityName,addLocationDetails, getLocationName} from '../../actionCreators/locationMasterAction';
import _ from 'underscore';
import UI from '../../components/newUI/superAdminDashboard';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


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

        
    getDropdown2=({stateResult})=>{
        console.log("stateResult", stateResult)
        if(stateResult){
            return stateResult.map((item)=>{
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
       
        
        var data1 = _.find(this.props.locationMasterReducer.stateResult,function(obj){
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
          console.log("cityId",this.state.cityId)
    }


    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    
    render (){
    console.log("stateId",this.state.stateId)
    console.log("cityId",this.state.cityId)
    console.log("countryId",this.state.countryId)
        console.log("locationMasterReducer",this.props.locationMasterReducer.stateResult)
        return(
            <UI onClick={this.logout}>
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Country Name</label>
                        <select required className ="form-control"  name="countryName"  onChange={this.onChangeCountry} >
                        <option value="">--SELECT--</option>
                            {this.getDropdown1(this.props.locationMasterReducer)}
                        </select>
                    </div>
                    <div>    
                        <label>State Name</label>
                        <select  required  className ="form-control" name="stateName" onChange={this.onChangeState}>
                        <option  value="">--SELECT--</option>
                            {this.getDropdown2(this.props.locationMasterReducer)}
                        </select>
                    </div>
                    <div>    
                        <label>City Name</label>
                        <select  required  className ="form-control"  name="cityName" onChange={this.onChangeCity} >
                        <option  value="">--SELECT--</option>
                            {this.getDropdown3(this.props.locationMasterReducer)}
                        </select>
                    </div>
                    <div>
                        <label>Location Name</label>
                        <input className ="form-control" type="text" name="locationName"  value={this.state.locationName}  onChange={this.onLocationChange} required></input>
                    </div>

                    <Button type="submit" color="primary" value="submit">Submit</Button>
                    <Button color="secondary" onClick={this.push}>Show Details</Button>
                </form> 
            </div>
            </UI>
        )
    }

}

function mapStateToProps(state){
    return{
    locationMasterReducer : state.locationMasterReducer
            }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCountryName,getStateName,getCityName,getLocationName,addLocationDetails},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(locationMaster);