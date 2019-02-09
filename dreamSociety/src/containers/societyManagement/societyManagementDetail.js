import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountry, getState, getCity, getLocation, getSociety, detailSociety, deleteSociety, updateSociety } from './../../actionCreators/societyMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';


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
                societyName: ''

            },
            menuVisible: false,
            search: '',
            modal: false

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
        this.props.getCountry()
        this.props.getState()
        this.props.getCity()
        this.props.getLocation()
        this.props.getSociety()
    }

    refreshData() {
        this.props.detailSociety()
    }


    editSocietyType = () => {
        const { societyId, countryId, stateId, cityId, locationId, societyName } = this.state
        this.props.updateSociety(societyId, countryId, stateId, cityId, locationId, societyName)
            .then(() => this.props.detailSociety())
        this.setState({
            editSocietyData: { societyId, countryId, stateId, cityId, locationId, societyName },
            modal: !this.state.modal
        })
    
    }

    deleteSocietyName = (societyId) => {

        this.props.deleteSociety(societyId)
            .then(() => this.props.detailSociety())

    }

    societyData = ({ detail_Society }) => {
        console.log('=========societyResult=========', detail_Society)
        if (detail_Society) {
            return detail_Society.filter(this.searchFilter(this.state.search)).map((item) => {
                console.log(item)

                return (
                    <tr key={item.societyId}>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.state_master.stateName}</td>
                        <td>{item.city_master.cityName}</td>
                        <td>{item.location_master.locationName}</td>
                        <td>{item.societyName}</td>
                            <td>
                                <button className="btn btn-success" onClick={this.toggle.bind(this, item.societyId, item.country_master.countryName, item.state_master.stateName, item.city_master.cityName, item.location_master.locationName, item.societyName)} >Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={this.deleteSocietyName.bind(this, item.societyId)} >Delete</button>
                            </td>
                    </tr>
                )
            })
        }
    }

    fetchCountry({ countryResult }) {
        
        console.log("=========country=====",countryResult )
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

    render() {
        return (
            <div>
                <UI onClick={this.logout}>
                        <div className="container" >
                            <Link to='/superDashboard/societyManagement'>
                                <button className="ui submit button" type="submit" style={{ backgroundColor: 'lightblue', marginTop: '25px' }}>Add Society</button>
                            </Link>
                            <div style={{ marginTop: '40px' }}>
                                <h3>Society details</h3>
                                <SearchFilter type="text" value={this.state.search}
                                    onChange={this.searchOnChange} />
                            </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Country Name</th>
                            <th>State Name</th>
                            <th>City Name</th>
                            <th>Location Name</th>
                            <th>Society Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.societyData(this.props.societyReducer)}
                    </tbody>
                </table>
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
                            <Input type="text" id="societyId" name="societyName" onChange={this.onChangeHandler} value={this.state.societyName} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editSocietyType}>Update Society</Button> 
                        <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
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