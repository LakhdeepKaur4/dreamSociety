import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getMaintenanceSubSizeDetails} from '../../actionCreators/maintenanceSubMasterAction'
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Table, Button } from 'reactstrap';
import '../../r-css/w3.css';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class MaintenanceSubMasterDetails extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this.props.getMaintenanceSubSizeDetails();
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard');
    }
    route = () => {
        return this.props.history.replace('/superDashboard/MaintenanceSubMasterForm')
    }
    render(){
        return(
            <UI>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Maintenance Sub Master Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Maintenance Size</Button>
                    </div>
                    <Table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </Table>
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        MaintenanceSubMaster: state.MaintenanceSubMaster
    }
}

export default connect(mapStateToProps, {getMaintenanceSubSizeDetails})(MaintenanceSubMasterDetails);