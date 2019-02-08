import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchParking } from '../../actionCreators/parkingAction';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchFilter from '../../components/searchFilter/searchFilter';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import UI from '../../components/newUI/superAdminDashboard';


class ParkingMaster extends Component {
    state = {
        menuVisible: false,
        search: ''
    }
    componentDidMount() {
        this.props.fetchParking()
    }

    delete_Parking(id) {
        this.props.deleteParking(id)
            .then(() => this.props.fetchParking())
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
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

    searchFilter(search) {
        return function (x) {
            return x.parking_master.parkingName.toLowerCase().includes(search.toLowerCase()) || !search;
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
                {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}> */}
                <UI onClick={this.logout}>
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
                </UI>
                {/* </SideBar>
                </div> */}
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