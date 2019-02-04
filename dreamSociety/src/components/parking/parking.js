import React, { Component } from 'react';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { fetchBasement, createParking } from '../../actionCreators/parkingAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/2.jpg';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
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
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="headernav" >
                    <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                        <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />

                    </Menu.Item>
                    <i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa">&#xf1ad;</i> <Link className="navbar-brand" to="#">DRE@M SOCIETY</Link>
                    <div className="navbar-collapse collapse" id="navbarCollapse" style={{ marginLeft: '20%' }}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/superDashboard">Home<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Gallery</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Contact Us</Link>
                            </li>
                        </ul>
                        <form className="form-inline mt-2 mt-md-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                onClick={this.editUser}>Logout</button>
                        </form>
                    </div>
                </nav>
                <div style={{ margin: '48px auto' }}>
                    <Sidebar.Pushable as={Segment} attached="bottom">
                        <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/registration">Super Admin Register</Link></Menu.Item>
                        <Menu.Item><Icon name="user" />Admin Register</Menu.Item>
                        <Menu.Item><Icon name="user" />Society Member Owner Register</Menu.Item>
                        <Menu.Item><Icon name="user" />Society Member Tenant Register</Menu.Item>
                        <Menu.Item><Icon name="user" /><Link to="/vendorDashboard">Vendor</Link></Menu.Item>
                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/add_parking/new">Parking Master</Link></Menu.Item>
                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/towermaster">Tower Master</Link></Menu.Item>
                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/event">Event Master</Link></Menu.Item>
                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/flatmaster">Flat Master</Link></Menu.Item>
                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/sizemaster">Size Master</Link></Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher dimmed={this.state.menuVisible}>
                            <Segment basic style={{ backgroundImage: `url(${Logo})`, padding: '55px 0px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
                                {/* <Header as="h3">Application Content</Header> */}
                                {/* <Image src='//unsplash.it/800/480' /> */}
                                <h1>Add Parking</h1>
                                <div className="form">
                                    <Form onSubmit={this.submit}>
                                        <FormGroup>
                                            <Label>Parking Name</Label>
                                            <Input type="select" name="parkingId" onChange={this.onChange}>
                                                <option  value=''>--Select--</option>
                                                {this.getParking(this.props.parkingDetail)}
                                            </Input>
                                            <span>{this.state.errors.parkingId}</span>
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
                                            <span>{this.state.errors.numberOfSlots}</span>
                                        </FormGroup>
                                        <Button color="success" className="mr-2">Add</Button>
                                        <Link to="/superDashboard/parking_master" color="primary">Parking Details</Link>
                                    </Form>
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
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