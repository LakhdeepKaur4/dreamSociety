import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AddSize } from '../../actionCreators/sizeMasterAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/2.jpg';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './sizeMaster.css';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

class SizeMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeType: "",
            menuVisible: false
        }

        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    submit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.AddSize(this.state)
        return this.setState({
            state: {

                sizeType: ""
            }
        }),
            this.props.history.push('/superDashboard/display-size');

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
                            <Segment basic style={{ backgroundImage: `url(${Logo})`,padding:'55px 0px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
                                <div className="form">
                                    <Form onSubmit={this.submit}>
                                        <FormGroup>
                                            <Label> Size Type</Label>
                                            <Input type="text" className="form-control" placeholder="sizeType" value={this.state.size_type} name="sizeType" onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Button type="submit" color="success">Submit</Button>
                                            <Link color="primary" to="/superDashboard/display-size">Size details</Link>
                                        </FormGroup>
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

function mapStateToProps(state) {
    console.log('shub', state);
    return {
        size: state.SizeDetails
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddSize }, dispatch);

}


export default connect(mapStateToProps, mapDispatchToProps)(SizeMaster)