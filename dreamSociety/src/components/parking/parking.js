import React, { Component } from 'react';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { fetchBasement, createParking } from '../../actionCreators/parkingAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/2.jpg';
// import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import './parking.css';

class Parking extends Component {
    componentDidMount() {
        this.props.fetchBasement()
    }

    state = {
        parkingId: '',
        numberOfSlots: '',
        menuVisible: false,
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

    onChange = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors })
            console.log(this.state)
        }
        else{
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
        if(!this.state.parkingId){
            errors.parkingId = `Parking details can't be empty. Please select any.`;
            console.log(this.state.errors);
        }
        if(this.state.numberOfSlots === ''){
            errors.numberOfSlots = `Please select number of slots.`;
            console.log(this.state.errors);
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            console.log(this.state);
            this.props.createParking({...this.state })
            .then(() => this.props.history.push('/superDashboard/parking_master'));
        }
        
    }

    render() {
        return (
            <div>
                <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({ menuVisible: false })}
                        style={{ backgroundImage: `url(${Logo})`,padding:'55px 0px',
                        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overFlow:`auto` }}
                        visible={this.state.menuVisible }>
                    <h1>Add Parking</h1>
                                <div className="form">
                                    <Form onSubmit={this.submit}>
                                        <FormGroup>
                                            <Label>Parking Name</Label>
                                            <Input type="select" name="parkingId" onChange={this.onChange}>
                                                <option  value=''>--Select--</option>
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
                                        <Link to="/superDashboard/parking_master" color="primary">Parking Details</Link>
                                    </Form>
                                </div>
                    </SideBar>
                </div>

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