import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getCountryName,getStateName,getCityName,addLocationDetails, getLocationName,getLocation} from '../../actionCreators/locationMasterAction';
import _ from 'underscore';
import UI from '../../components/newUI/superAdminDashboard'; 
import DefaultSelect from '../../constants/defaultSelect';


class locationMaster extends Component{
    constructor(props){
        super(props);
        this.state={ 
            locationId:'',
            countryId:'',
            countryName: '',
            stateId: '',
            stateName:'',
            cityId: '',
            cityName:'',
            locationName:'',
            errors:{},
            loading:true,
            message:''
        }
    }

    

    componentDidMount(){
        this.refreshData();
    }
    
    refreshData(){
        this.props.getLocation();
        this.props.getCountryName();
        this.props.getStateName();
        this.props.getCityName();
        this.props.getLocationName();       
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
        this.onChange(event);
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
        this.onChange(event);
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
        this.onChange(event);
        let selected= event.target.value;     
        
        var data2 = _.find(this.props.locationMasterReducer.city,function(obj){
            return obj.cityName === selected
            })
            
          this.props.getLocationName(data2.cityId)

           this.setState({cityId:data2.cityId})
    }

    onLocationChange=(e)=>{
        this.setState({message:''})
        this.onChange(e);
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    onChange=(e)=>{
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

   

    onSubmit=(event)=> {
       
        event.preventDefault();
        const { countryId,stateId,cityId,locationName} = this.state
        let errors = {};
        if (!this.state.countryId) {
            errors.countryId = "Country Name can't be empty"
        }
        else if (this.state.stateId === '') {
            errors.stateId = "State Name can't be empty";
        }
        else if (this.state.cityId === ''){
            errors.cityId = "City Name can't be empty";
        }
        else if (this.state.locationName===''){
            errors.locationName="Location Name can't be empty"
        }
        this.setState({ errors });       
        const isValid = Object.keys(errors).length === 0;
        if(isValid){           
                    this.setState({loading:true});
                    this.props.addLocationDetails(countryId,stateId,cityId,locationName)
                    .then(()=>
                    this.push())
                    .catch(err=>{
                        this.setState({message: err.response.data.message, loading: true})
                    
                    })
                    // this.setState({
                    //     locationId:'',
                    //     countryId:'',
                    //     countryName: '',
                    //     stateId: '',
                    //     stateName:'',
                    //     cityId: '',
                    //     cityName:'',
                    //     locationName:''               
                    // });
        
               
                    }      
    }

    push=()=>{
        this.props.history.push('/superDashboard/displayLocation')
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
                        <select defaultValue='no-value' className ="form-control" name="countryId"  onChange={this.onChangeCountry} >
                        <DefaultSelect/>
                            {this.getDropdown1(this.props.locationMasterReducer)}
                        </select>
                        <span className='error'>{this.state.errors.countryId}</span>
                    
                    </div>
                    <div>    
                        <label>State Name</label>
                        <select defaultValue='no-value' className ="form-control" name="stateId" onChange={this.onChangeState}>
                        <DefaultSelect/>
                            {this.getDropdown2(this.props.locationMasterReducer)}
                        </select>
                        <span className='error'>{this.state.errors.stateId}</span>
                    </div>
                    <div>    
                        <label>City Name</label>
                        <select defaultValue='no-value' className ="form-control"  name="cityId" onChange={this.onChangeCity} >
                        <DefaultSelect/>
                            {this.getDropdown3(this.props.locationMasterReducer)}
                        </select>
                        <span className='error'>{this.state.errors.cityId}</span>
                    </div>
                    <div>
                        <label>Location Name</label>
                        <input  type="text" placeholder="Location Name" className ="form-control" name="locationName" maxLength={30}  value={this.state.locationName}  onChange={this.onLocationChange} ></input>
                        <span className='error'>{this.state.errors.locationName}</span>
                        <span className="error">{this.state.message}</span>
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