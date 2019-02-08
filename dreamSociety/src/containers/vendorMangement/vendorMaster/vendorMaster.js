import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { addVendorMaster } from '../../../actionCreators/vendorMasterAction';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/2.jpg';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import UI from '../../../components/newUI/vendorDashboardInside';


class vendorMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorName: '',
            serviceName: '',
            serviceId: '',
            description: '',
            menuVisible: false
        }
        this.handleChange = this.handleChange.bind(this);

    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        this.props.getServiceType();
    }

    getDropDowm = ({ item }) => {
        if (item) {
            return item.map((item) => {
                return (
                    <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName}
                    </option>
                )
            })
        }

    }



    onSubmit = (event) => {
        event.preventDefault();
        this.props.addVendorMaster(this.state);
        this.setState(
            {
                vendorName: '',
                serviceName: '',
                serviceId: '',
                description: ''
            }

        )
        this.props.history.push('/superDashboard/displayVendorMaster')
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    render() {
        return (
            <div>
                {/* <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="headernav" >
                    <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                        <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />

                    </Menu.Item>
                    <i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa">&#xf1ad;</i> <Link className="navbar-brand" to="#">DRE@M SOCIETY</Link>
                    <div className="navbar-collapse collapse" id="navbarCollapse" style={{ marginLeft: '20%' }}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/vendorDashboard">Home<span className="sr-only">(current)</span></Link>
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
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/serviceMaster">Service Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/vendorMaster">Vendor Master</Link></Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher dimmed={this.state.menuVisible}>
                            <Segment basic style={{ backgroundImage: `url(${Logo})`, padding: '55px 0', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}> */}
                <UI onClick={this.logout}>
                    {/* <Header as="h3">Application Content</Header> */}
                    {/* <Image src='//unsplash.it/800/480' /> */}
                    <div className="form1 col-8">
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <label>Vendor Name</label>
                                <input type="text" className="form-control" name="vendorName" value={this.state.vendorName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange} required></input>
                            </div>
                            <div>
                                <label>Service Type</label>
                                <select className="form-control" value={this.state.serviceId} onChange={(e) => {
                                    this.setState({ serviceId: e.target.value })
                                }} required>
                                    <option>--SELECT--</option>
                                    {this.getDropDowm(this.props.displayServiceMasterReducer)}
                                </select>
                            </div>
                            <div>
                                <label>Description</label>
                                <input className="form-control" value={this.state.description} onChange={this.handleChange} type="text" name="description" required></input>
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary mr-2" value="submit">Submit</button>

                                <Link to='/superDashboard/displayVendorMaster'>
                                    <button className="btn">Show Details</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </UI>
                {/* </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div> */}

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        vendorMasterReducer: state.vendorMasterReducer
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ getServiceType, addVendorMaster }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(vendorMaster);
