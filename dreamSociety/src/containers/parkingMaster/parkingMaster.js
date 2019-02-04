import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchParking} from '../../actionCreators/parkingAction';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';

class ParkingMaster extends Component {
    state = {
        menuVisible: false,
        search:''
    }
    componentDidMount() {
        this.props.fetchParking()
    }

    delete_Parking(id) {
        this.props.deleteParking(id)
            .then(() => this.props.fetchParking())
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    renderParking({ parking }) {
        console.log(parking);
        if (parking) {
            return parking.slot.filter(this.searchFilter(this.state.search)).map((item) => {
                console.log(item)
                return (
                    <tr key={item.parking_master.parkingName}>
                        <td>
                            {item.parking_master.parkingName}
                        </td>
                        <td>
                            {item.count}
                        </td>
                        <td>
                            <Button color='success' className="mr-2">Edit</Button>
                            <Button color='danger' onClick={this.delete_Parking.bind(this, item.id)}>Delete</Button>
                        </td>
                    </tr>
                );
            })
        }
    }

    searchFilter(search){
        return function(x){
            return x.parking_master.parkingName.toLowerCase().includes(search.toLowerCase()) || !search;
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
                            <Segment basic >
                                {/* <Header as="h3">Application Content</Header> */}
                                {/* <Image src='//unsplash.it/800/480' /> */}
                                <h1 style={{ color: 'black' }}>Add Parking</h1>
                                <div>
                                    
                                    <div className="container">
                                        <div>
                                            <Link to='/superDashboard/add_parking/new'>Add Parking</Link>
                                        </div>
                                        <h3>Parking details</h3>
                                        <SearchFilter type="text" value={this.state.search}
                                            onChange={this.searchOnChange} />
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Basement</th>
                                                    <th>No. of Parking</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderParking(this.props.parkingDetail)}
                                            </tbody>
                                        </Table>
                                    </div>
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
    console.log(state)
    return {
        parkingDetail: state.parkingDetail
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchParking }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingMaster);