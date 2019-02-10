import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { fetchBasement, createParking } from '../../actionCreators/parkingAction';
import { connect } from 'react-redux';
import './parking.css';
import ParkingForm from './parkingForm';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class Parking extends Component {
    componentDidMount() {
        this.props.fetchBasement()
    }

    state = {
        parkingId: '',
        numberOfSlots: '',
        menuVisible: false,
        loading: false,
        errors: {}
    }

    getParking({ parking }) {
        console.log(parking)
        if (parking) {
            console.log(parking)
            return parking.map((item) => {
                console.log(item)
                return (
                    <option name="parkingId" value={item.parkingId} key={item.parkingId}>
                        {item.parkingName}
                    </option>
                )
            })
        }
    }

    routeToParkingDetails = () => {
        this.props.history.push('/superDashboard/parking_master');
    }

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors })
            console.log(this.state)
        }
        else {
            this.setState({ [e.target.name]: e.target.value })
        }

        console.log(this.state)
    }

    numberOfSlots = (event) => {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};
        let {parkingId, numberOfSlots} = this.state;
        if (!this.state.parkingId) {
            errors.parkingId = `Parking details can't be empty. Please select any.`;
            console.log(this.state.errors);
        }
        if (this.state.numberOfSlots === '') {
            errors.numberOfSlots = `Please select number of slots.`;
            console.log(this.state.errors);
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            console.log(this.state);
            this.setState({loading: true})
            this.props.createParking({ parkingId, numberOfSlots })
            .then(() => {
                this.setState({loading: false})
                this.props.history.push('/superDashboard/parking_master')
                })
            
                this.setState(
                    {
                        parkingId: '',
                        numberOfSlots: '',
                        menuVisible: false,
                        errors: {}
                    }
                );
              
        }

    }
    logout=()=>{

        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    render() {
        let formData;
        if(!this.state.loading && this.props.parkingDetail.parking && this.state.errors){
            formData = <ParkingForm 
                            parkingName="parkingId"
                            parkingChange={this.onChange}
                            fetchParkingName={this.getParking(this.props.parkingDetail)}
                            parkingError={this.state.errors.parkingId}
                            parkingSlotValueName="numberOfSlots"
                            parkingSlotValue = {this.state.numberOfSlots}
                            parkingSlotValueChange={this.onChange}
                            parkingSlotKeyPress={this.numberOfSlots}
                            parkingSlotError={this.state.errors.numberOfSlots}
                            routeToParkingDetails={this.routeToParkingDetails}
                             />
        }
        else if(!this.props.parkingDetail.parking){
            formData = <div style={{textAlign:'center', fontSize:'20px'}}><Spinner />Fetching parking Names...</div>
        }
        else if(this.submit){
            formData = <div style={{textAlign:'center', fontSize:'20px'}}><Spinner />Adding Parking. Please! Wait...</div>
        }
        return (
            <div>
                <UI onClick={this.logout}>
                    <div className="form col-8" >
                        <Form onSubmit={this.submit}>
                            <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Parking</h3></div>
                            <div>{formData}</div>
                        </Form>
                    </div>
                </UI>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        parkingDetail: state.parkingDetail.all
    }
}

export default connect(mapStateToProps, { fetchBasement, createParking })(Parking);