import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchParking } from '../../actionCreators/parkingAction';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';


class ParkingMaster extends Component {
    state = {
        menuVisible: false,
        loading:false,
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

    render() {
        const tableData = <Table>
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
        return (
            <div>
                <UI>
                    <div>

                        <div className="container">
                            <div>
                                <Link to='/superDashboard/add_parking/new'>Add Parking</Link>
                            </div>
                            <h3>Parking details</h3>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {this.props.parkingDetail.parking ? tableData : <Spinner />}
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