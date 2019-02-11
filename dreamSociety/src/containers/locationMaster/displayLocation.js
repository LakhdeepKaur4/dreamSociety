import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getLocation,getStateName,getCountryName,getCityName,getLocationName,updateLocation,deleteLocation} from '../../actionCreators/locationMasterAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';


class DisplayLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editLocation: {
                countryId: '',
                countryName: '',
                stateName: '',
                stateId: '',
                cityName: '',
                cityId: '',
                locationName: '',
                locationId: '',
                isActive:false
            },
            menuVisible: false,
            search: '',
            modal: false

        };
    }


componentDidMount(){
    this.props.getLocation();
    this.props.getStateName();
    this.props.getCountryName();
    this.props.getCityName();
    this.props.getLocationName();
}    

refreshData() {
    this.props.getLocation()
}


onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
}

toggle = (locationId, countryName, stateName, cityName, locationName) => {

    this.setState({
        locationId,
        countryName,
        stateName,
        cityName,
        locationName,
        modal: !this.state.modal
    })
}

delete = (locationId) => {

    let {isActive } =this.state.editLocation;  
    this.props.deleteLocation(locationId,isActive)
        .then(() => this.refreshData())
        this.setState({editLocation:{isActive:false}})
}

toggleModal = () => {
    this.setState({ modal: !this.state.modal })
}

renderList=({details})=>{
    if(details){
        return details.map((item)=>{
            return(
                <tr key={item.locationId}>
                <td>{item.country_master.countryName}</td>
                <td>{item.state_master.stateName}</td>
                <td>{item.city_master.cityName}</td>
                <td>{item.locationName}</td>
                <td>
                    <button className="btn btn-success" onClick={this.toggle.bind(this, item.locationId, item.country_master.countryName,item.state_master.stateName,item.city_master.cityName,item.locationName)}> Edit</button>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.delete.bind(this,item.locationId)}> Delete</button>
                </td>
                </tr>
                
            )
        })
    }

}

fetchCountry({ country }) {
    if (country) {
        return (
            country.map((item) => {
                return (
                    <option value={item.countryId} key={item.countryId}>
                        {item.countryName}
                    </option>
                )
            })
        )
    }
}

fetchState({ state }) {
    if (state) {

        return (
            state.map((item) => {

                return (
                    <option value={item.stateId} key={item.stateId}>
                        {item.stateName}
                    </option>
                )
            })
        )
    }
}



fetchCity({city}) {
    if (city) {

        return (
            city.map((item) => {

                return (
                    <option value={item.cityId} key={item.cityId}>
                        {item.cityName}
                    </option>
                )
            })
        )
    }
}


updateLocation = () => {
    const { locationId, countryId, stateId, cityId,locationName } = this.state
    this.props.updateLocation(locationId, countryId, stateId, cityId,locationName)
        .then(() => this.refreshData())
    this.setState({
        editLocation: { locationId, countryId, stateId, cityId,locationName},
        modal: !this.state.modal
    })

}

render(){
    
    return(
        <div>
        <UI onClick={this.logout}>
        
              
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
             <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                 <ModalHeader toggle={this.toggle}> Edit Details</ModalHeader>
                 <ModalBody>
                     <FormGroup>
                         <Label> Country Name</Label>
                         <Input type="select" id="countryId" name="countryName" onChange={(e) => {

                            let { countryId } = this.state;
                            countryId = e.target.value;
                            this.setState({ countryId });
                            this.props.getStateName(countryId)
                            }} >
                            <option value={this.state.countryId}>{this.state.countryName}</option>
                            <option disabled>Select</option>
                            {this.fetchCountry(this.props.locationMasterReducer)}

                        </Input>
                     </FormGroup>
                     <FormGroup>
                         <Label>State Name</Label>
                         <Input type="select" id="stateId" name="stateName" onChange={(e)=>{
                            
                            let { stateId } = this.state;
                            stateId = e.target.value;
                            this.setState({ stateId });
                            this.props.getCityName(stateId)
                            }} >
                            <option value={this.state.stateId}>{this.state.stateName}</option>
                            <option disabled>Select</option>
                            {this.fetchState(this.props.locationMasterReducer)}
                            
                         </Input>
                     </FormGroup>
                     <FormGroup>
                         <Label>City Name</Label>
                         <Input type="select" id="cityId" name="cityName" onChange={(e)=>{
                            let { cityId } = this.state;
                            cityId = e.target.value;
                            this.setState({ cityId });
                            this.props.getLocationName(cityId)
                             }} >
                            <option value={this.state.cityId}>{this.state.cityName}</option>
                            <option disabled>Select</option>
                            {this.fetchCity(this.props.locationMasterReducer)}
                         </Input>
                     </FormGroup>
                     <FormGroup>
                         <Label>Location Name</Label>
                         <Input type="text" id="locationId" name="locationName" onChange={this.onChangeHandler} value={this.state.locationName} />
                     </FormGroup> 
                 </ModalBody>
                 <ModalFooter>
                        <Button color="primary" onClick={this.updateLocation}>Update</Button> 
                        <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                 </ModalFooter>
             </Modal> 

        </UI>
        </div>
    )
}

}


    function mapStatToProps(state) {
        return {
        locationMasterReducer:state.locationMasterReducer
        }
    }
    
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({getLocation,getStateName,getCountryName,getCityName,getLocationName,updateLocation,deleteLocation}, dispatch)
    }
    
    export default connect(mapStatToProps, mapDispatchToProps)(DisplayLocation);


