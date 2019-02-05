import React,{Component} from 'react';
import {getLocation,getCountryName} from '../../actionCreators/locationMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
// import  axios from 'axios';
// import {authHeader} from '../../helper/authHeader';
// import {URN} from '../../actions/index';


class locationDetails extends Component{
        
    state={

        editLocationData:{

            locationId:'',
            countryId:'',
            countryName: '',
            stateId: '',
            stateName:'',
            cityId: '',
            cityName:'',       
            locationName:'',
            isActive: false
    },
    editLocationModal: false
}


componentDidMount(){
    this.props.getLocation();
    this.props.getCountryName();
}


componentWillMount(){
    this.refreshData()
}

refreshData(){
     this.props.getLocation();
}

  
edit(locationId,countryId,countryName,stateId,stateName,cityId,cityName,locationName){
    this.setState({
        editLocationData:{
            locationId,countryId,countryName,stateId,stateName,cityId,cityName,locationName},editLocationModal: !this.state.editLocationModal
    })

}




toggleEditLocationModal(){
    this.setState({
        editLocationModal: ! this.state.editLocationModal
    });
}



getDropdown1=({country})=>{
  
    if(country){
        return country.map((items)=>{  console.log(items,"abc")

            return(
                <option key={items.countryId} value={items.countryName}>
                {items.countryName}
                </option>
            )
        })
    
    }
  
}



renderList =({details})=>{
    
    if(details){
        return details.map((item) =>{
        
            return(
                   
                    <tr  key={item.locationId}>
                                          
                            <td>{item.country_master.countryName}</td>
                            <td>{item.state_master.stateName}</td>
                            <td>{item.city_master.cityName}</td>
                            <td>{item.locationName}</td>
                           
                            
                                <td>
                                   <button className="btn btn-primary" onClick={this.edit.bind(this,item.locationId,item.countryId,item.countryName,item.stateId,item.stateName,item.cityId,item.cityName,item.locationName)} >Edit</button>
                                </td>
                                 <td>
                                   <button className="btn btn-danger" >Delete</button>
                                 </td>  
                    </tr>
       
            )
        })
    }  
}    

render(){
    return(
        <div>
            <Modal>
                
            </Modal>
                  
            <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Country Name</th>
                        <th>State Name</th>
                        <th>City Name</th>
                        <th>Location Name</th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    {this.renderList(this.props.locationMasterReducer)}
                    </tbody>
                </table>    
                
                {/* <button onClick={this.push}> Add Flat</button> */}
        </div>
    )
}

}

function mapStateToProps(state){
    return{
        locationMasterReducer:state.locationMasterReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getLocation,getCountryName},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(locationDetails);