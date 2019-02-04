import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addServiceType, getServiceDetail } from '../../../actionCreators/serviceMasterAction';
import './serviceMaster.css';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/2.jpg';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';



class serviceMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {

            serviceName: '',
            serviceDetailId: '',
            service_detail: '',
            menuVisible: false
        }

    }


    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value)


    }

    componentDidMount() {
        this.props.getServiceDetail();
    }

    refreshData() {
        this.props.addServiceType();
    }

    getDropdown = ({ detail }) => {
        if (detail) {
            return detail.service.map((item) => {
                console.log(item)
                return (
                    <option key={item.serviceDetailId} value={item.serviceDetailId} >
                        {item.service_detail}</option>
                )

            })



        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.addServiceType(this.state)

        this.setState(
            {
                state: {
                    serviceName: '',
                    serviceDetailId: '',
                    service_detail: ''

                }

            })

        this.props.history.push('/superDashboard/displayServices')




    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    render() {

        return (<div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="headernav" >
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
                        <Segment basic style={{ backgroundImage: `url(${Logo})`,padding:'55px 0px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
                            {/* <Header as="h3">Application Content</Header> */}
                            {/* <Image src='//unsplash.it/800/480' /> */}
                            <div className="form">
                                <form onSubmit={this.onSubmit}>
                                    <div>
                                        <label>Service Type</label>
                                        <input type="text" className="form-control" name="serviceName" value={this.state.serviceName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange} required></input>
                                    </div>
                                    <div>
                                        <label>Service Details</label>
                                        <select className="form-control" value={this.state.serviceDetailId} onChange={(e) => this.setState({ serviceDetailId: e.target.value })}>
                                            <option >--SELECT--</option>
                                            {this.getDropdown(this.props.serviceMasterReducer)}
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary" value="submit">Submit</button>
                                    <Link to='/superDashboard/displayServices'>
                                        <button className="btn">Show Details</button>
                                    </Link>
                                </form>
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
    console.log(state);
    return {
        serviceMasterReducer: state.serviceMasterReducer

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addServiceType, getServiceDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(serviceMaster);
