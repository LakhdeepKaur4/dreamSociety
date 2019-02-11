import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchParking } from '../../actionCreators/parkingAction';
import { Table, Button } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';


class ParkingMaster extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuVisible: false,
            loading:true,
            search: ''
        }
    }
    componentDidMount() {
        this.refreshData()
    }

    refreshData(){
        this.props.fetchParking().then(() => this.setState({loading: false}))
    }

    delete_Parking(id) {
        this.props.deleteParking(id)
            .then(() => this.refreshData())
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

    searchFilter(search){
        return function(x){
            const slots = x.count.toString()
            return x.parking_master.parkingName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            slots.includes(search)||
           !search;
        }
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    render() {
        let tableData;
        if(this.props.parkingDetail.parking){
            tableData = <div style={{margin:'0 auto'}}>
                <Table className="w3-responsive">
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
        } 
        else {
            tableData = <Spinner />
        }
        return (
            <div>
                <UI onClick={this.logout}>
                    <div>

                        <div className="w3-container w3-margin-top w3-responsive">
                            <div className="top-details">
                                <h3>Parking details</h3>
                                <Button color="primary" onClick={() => this.props.history.push('/superDashboard/add_parking/new')}>Add Parking</Button>
                            </div>
                            
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {!this.state.loading ? tableData: <Spinner /> }
                        </div>
                    </div>
                </UI>
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