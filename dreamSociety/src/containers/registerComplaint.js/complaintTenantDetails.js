import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getRegisterDetail} from '../../actionCreators/registerComplainAction';
import UI from '../../components/newUI/tenantDashboard';
import {Table,Button } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';


class ComplaintTenantDetails extends Component{
       constructor(props){
        super(props);
           this.state={
               filterName:"serviceName",
               search:'',
               loading: true
           }
       }

    componentWillMount() {
        this.refreshData()

    }

    refreshData=()=>{
        this.props.getRegisterDetail().then(() => this.setState({ loading: false }))
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) { console.log(x)
            return x.service_master.serviceName.toLowerCase().includes(search.toLowerCase())  
              ||!search;
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword=()=>{ 
        console.log("password")
        return this.props.history.replace('/tenantDashboard/changePasswordTenant')
    }

    close = () => {
        return this.props.history.replace('/tenantDashboard')
    }

    
    renderComplaint = ({ getComplaints }) => {

        if (getComplaints && getComplaints.complaints) {

       return getComplaints.complaints.sort((item1,item2)=>{
        var cmprVal =  (item1.service_master[this.state.filterName].localeCompare(item2.service_master[this.state.filterName])) 
        return this.state.sortVal ? cmprVal : -cmprVal;
        }).filter(this.searchFilter(this.state.search)).map((item, index) => {  console.log(item)
           
                return (
                    <tr key={item.complaintId}  >
                        <td>{index + 1}</td>
                        <td>{item.service_master ? item.service_master.serviceName: ''}</td>
                        <td>{item.date.split('T')[0]}</td>
                        {/* <td></td> */}
                        <td>{item.vendor_master ? item.vendor_master.firstName : ''}</td>
                        <td>{item.vendor_master ? item.vendor_master.contact : ''}</td>
                        <td><strong>{item.complaint_status_master ? item.complaint_status_master.statusType : ''}</strong></td>
                    </tr>

                )

            })
        }
    }
    

    render(){
        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr  >
                        <th>#</th>
                        <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'serviceName'}});
                        }} >Service Type <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Date</th>
                        {/* <th>Selected Time</th> */}
                        <th>Vendor name</th>
                        <th>Contact no</th>
                        <th>View Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderComplaint(this.props.registerComplaintReducer)}
                </tbody>
            </Table></div>

        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                </div>
                <div className="top-details">
                            <h3>Compaint Details</h3>
                        </div>
                <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                   {(this.state.loading) ? <Spinner /> : tableData}
                </div>
                </UI>
            </div> 
        )
    }
}

function mapStateToProps(state) {
      
return {

    registerComplaintReducer : state.registerComplaintReducer  
}



}
function mapDispatchToProps(dispatch) {
return bindActionCreators({ getRegisterDetail }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(ComplaintTenantDetails));