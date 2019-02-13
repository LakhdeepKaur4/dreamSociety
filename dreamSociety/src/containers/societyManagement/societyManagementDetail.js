import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountry, getState, getCity, getLocation, getSociety, detailSociety, deleteSociety, updateSociety } from './../../actionCreators/societyMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import {Table, Button, Modal, FormGroup, ModalBody, ModalHeader,  Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';


class SocietyManagementDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editSocietyData: {
                countryId: '',
                countryName: '',
                stateName: '',
                stateId: '',
                cityName: '',
                cityId: '',
                locationName: '',
                locationId: '',
                societyId: '',
                societyName: '',
                isActive:false,

            },
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            

        };
    }
    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggle = (societyId, countryName, stateName, cityName, locationName, societyName) => {

        this.setState({
            societyId,
            countryName,
            stateName,
            cityName,
            locationName,
            societyName,
            
            modal: !this.state.modal
        })
    }
    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentDidMount() {
        this.refreshData()
      
    }

    refreshData() {
        this.props.detailSociety().then(() => this.setState({loading: false}))
        this.props.getCountry().then(() => this.setState({loading: false}))
        this.props.getState().then(() => this.setState({loading: false}))
        this.props.getCity().then(() => this.setState({loading: false}))
        this.props.getLocation().then(() => this.setState({loading: false}))
        this.props.getSociety().then(() => this.setState({loading: false}))
    }


    editSocietyType = () => {
        this.setState({
            loading: true
        })
        const { societyId, countryId, stateId, cityId, locationId, societyName } = this.state
        this.props.updateSociety(societyId, countryId, stateId, cityId, locationId, societyName)
            .then(() => this.refreshData())
        this.setState({
            editSocietyData: { societyId, countryId, stateId, cityId, locationId, societyName },
            modal: !this.state.modal
        })
    
    }

    deleteSocietyName = (societyId) => {
        let {isActive}=this.state.editSocietyData
        this.setState({
            loading: true
        })
        this.props.deleteSociety(societyId, isActive)
            .then(() => this.refreshData())
            this.setState({editSocietyData:{isActive:false}})

    }

    societyData = ({ detail_Society }) => {
        console.log('=========societyResult=========', detail_Society)
        if (detail_Society) {
            return detail_Society.filter(this.searchFilter(this.state.search)).map((item) => {
              

                return (
                    <tr key={item.societyId}>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.state_master.stateName}</td>
                        <td>{item.city_master.cityName}</td>
                        <td>{item.location_master.locationName}</td>
                        <td>{item.societyName}</td>
                            <td>
                                <Button color="success mr-2" onClick={this.toggle.bind(this, item.societyId, item.country_master.countryName, item.state_master.stateName, item.city_master.cityName, item.location_master.locationName, item.societyName)} >Edit</Button>
                            
                                <Button color="danger" onClick={this.deleteSocietyName.bind(this, item.societyId)} >Delete</Button>
                            </td>
                    </tr>
                )
            })
        }
    }

    fetchCountry({ countryResult }) {
        
        
        if (countryResult) {
            return (
                countryResult.map((item) => {
                    return (
                        <option value={item.countryId} key={item.countryId}>
                            {item.countryName}
                        </option>
                    )
                })
            )
        }
    }

    fetchState({ stateResult }) {
        if (stateResult) {

            return (
                stateResult.map((item) => {

                    return (
                        <option value={item.stateId} key={item.stateId}>
                            {item.stateName}
                        </option>
                    )
                })
            )
        }
    }

    fetchCity({ cityResult }) {
        if (cityResult) {

            return (
                cityResult.map((item) => {

                    return (
                        <option value={item.cityId} key={item.cityId}>
                            {item.cityName}
                        </option>
                    )
                })
            )
        }
    }

    fetchLocation({ locationResult }) {
        if (locationResult) {
            return (
                locationResult.map((item) => {
                    return (
                        <option value={item.locationId} key={item.locationId}>
                            {item.countryName}
                        </option>
                    )
                })
            )
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.societyName.toLowerCase().includes(search.toLowerCase()) ||
                x.country_master.countryName.toLowerCase().includes(search.toLowerCase()) ||
                x.state_master.stateName.toLowerCase().includes(search.toLowerCase()) ||
                x.city_master.cityName.toLowerCase().includes(search.toLowerCase()) ||
                x.location_master.locationName.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }

    
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    routeToAddNewSociety =() => {
        this.props.history.push('/superDashboard/societyManagement')
    }

    render() {
        let tableData;

        tableData= <div style={{backgroundColor:'lightgray'}}>
        <Table className="table table-bordered">
            <thead>
                <tr>
                    <th>Country Name</th>
                    <th>State Name</th>
                    <th>City Name</th>
                    <th>Location Name</th>
                    <th>Society Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.societyData(this.props.societyReducer)}
            </tbody>
        </Table>
        </div>
        return (
            <div>
                <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                <div className="top-details">
                                <h3>Society Details</h3>
                                <Button onClick={this.routeToAddNewSociety} color="primary">Add Society</Button>
                            </div>
                            <div style={{ marginTop: '40px' }}>
                              
                                <SearchFilter type="text" value={this.state.search}
                                    onChange={this.searchOnChange} />
                            </div>
                            {!this.state.loading ? tableData : <Spinner />}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="countryName">Country Name</Label>

                            <Input type="select" id="countryId" name="countryName" onChange={(e) => {

                                let { countryId } = this.state;
                                countryId = e.target.value;
                                this.setState({ countryId });
                                this.props.getState(countryId)
                            }} >
                                <option value={this.state.countryId}>{this.state.countryName}</option>
                                <option disabled>Select</option>
                                {this.fetchCountry(this.props.societyReducer)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="stateName">State Name</Label>
                            <Input type="select" id="stateId" name="stateName" onChange={(e) => {
                                let { stateId } = this.state;
                                stateId = e.target.value;
                                this.setState({ stateId });
                                this.props.getCity(stateId)
                            }} >
                                <option value={this.state.stateId}>{this.state.stateName}</option>
                                <option disabled>Select</option>
                                {this.fetchState(this.props.societyReducer)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="cityName">City Name</Label>
                            <Input type="select" id="cityId" name="cityName" onChange={(e) => {
                                let { cityId } = this.state;
                                cityId = e.target.value;
                                this.setState({ cityId });
                                this.props.getLocation(cityId)
                            }} >
                                <option value={this.state.cityId}>{this.state.cityName}</option>
                                <option disabled>Select</option>
                                {this.fetchCity(this.props.societyReducer)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="stateName">Location Name</Label>
                            <Input type="select" id="locationId" name="locationName" onChange={(e) => {
                                let { locationId } = this.state;
                                locationId = e.target.value;
                                this.setState({ locationId });
                                this.props.getSociety(locationId)
                            }}>
                                <option value={this.state.locationId}>{this.state.locationName}</option>
                                <option disabled>Select</option>
                                {this.fetchLocation(this.props.societyReducer)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="societyName">Society Name</Label>
                            <Input type="text" id="societyId" name="societyName" onChange={this.onChangeHandler} value={this.state.societyName}  maxLength={50} required/> 
                        </FormGroup>
                   
                        <Button color="primary mr-2" onClick={this.editSocietyType}>Save</Button> 

                        <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                    </ModalBody>
                </Modal>
               </div>
               </UI>
         </div>
        );
    }
}


function mapStatToProps(state) {
    return {
        societyReducer: state.societyReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, getState, getCity, getLocation, getSociety, detailSociety, deleteSociety, updateSociety }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(SocietyManagementDetail);