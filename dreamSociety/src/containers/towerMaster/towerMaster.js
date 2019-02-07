import React, { Component } from 'react';
import AddTower from '../../actionCreators/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logo from '../../assets/2.jpg';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './towerMaster.css'


class TowerMaster extends Component {

    constructor(props) {
        super(props);


        this.state = {

            towerName: "",
            menuVisible: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onSubmit(event) {
        event.preventDefault();
        console.log(this.state)

        this.props.AddTower(this.state)
        return this.setState({
            state: {

                towerName: ""
            }
        }),
            this.props.history.push('/superDashboard/display-tower');
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
                <div style={{ marginTop: '48px' }}>
                    <Sidebar.Pushable as={Segment} attached="bottom">
                        <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/registration">Society Admin Register</Link></Menu.Item>
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
                            <Segment basic style={{ backgroundImage: `url(${Logo})`,padding:'55px 0', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
                                {/* <Header as="h3">Application Content</Header> */}
                                {/* <Image src='//unsplash.it/800/480' /> */}
                                <div className="form col-8">
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Label>Tower Name</Label>
                                            <Input type="text" className="form-control" placeholder="tower Name" name="towerName" value={this.state.name} onKeyPress={this.OnKeyPresshandler} onChange={this.onChange} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color="success" className="mr-2">Submit</Button>
                                            <Button color="primary" to="/superDashboard/display-tower">Tower details</Button>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>



            </div>
        );

    }

}

function mapStateToProps(state) {
    console.log(state);
    return {
        Tower: state.TowerDetails
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddTower }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TowerMaster)