import React, { Component } from 'react';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { fetchBasement, createParking } from '../../actionCreators/parkingAction';
import { connect } from 'react-redux';
import './parking.css';
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
            this.props.createParking({ ...this.state })
                .then(() => this.props.history.push('/superDashboard/parking_master'))
                this.setState(
                    {
                        parkingId: '',
                        numberOfSlots: '',
                        menuVisible: false,
                        loading: false,
                        errors: {}
                    }
                );
            this.setState({loading:true})
        }

    }

    render() {
        const formData = <div>
            <FormGroup>
                <Label>Parking Name</Label>
                <Input type="select" name="parkingId" onChange={this.onChange}>
                    <option value=''>--Select--</option>
                    {this.getParking(this.props.parkingDetail)}
                </Input>
                <span className='error'>{this.state.errors.parkingId}</span>
            </FormGroup>
            <FormGroup>
                <Label>Parking</Label>
                <Input name="numberOfSlots"
                    type="text"
                    value={this.state.numberOfSlots}
                    onChange={this.onChange}
                    onKeyPress={this.numberOfSlots}
                    maxLength='2'
                    minLength='1'
                />
                <span className='error'>{this.state.errors.numberOfSlots}</span>
            </FormGroup>
            <Button color="success" className="mr-2">Add</Button>
            <Button onClick={this.routeToParkingDetails} color="primary">Parking Details</Button>
        </div>
        return (
            <div>
                <UI>
                    <div className="form col-8">
                        <Form onSubmit={this.submit}>
                        <div>{!this.state.loading && this.state.errors ? formData : 
                            <div style={{textAlign:'center'}}>
                                <Spinner />
                                <span style={{fontSize:'20px'}}>Parking is getting created!Please wait...</span>
                            </div>}
                        </div>
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