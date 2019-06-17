import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getDesignation, deleteDesignation, updateDesignation, deleteSelectDesignation } from './../../actions/designationMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner';


class FacilitySubMasterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {



        };
    }

    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        // this.props.getDesignation().then(() => this.setState({ loading: false, modalLoading: false, modal: false }))
    }

    render() {

        // let subData=<div>
               
        //     </div>
        return (
            <div>
                FacilitySubMasterDetail
           </div>
        )
    }

}

function mapStatToProps(state) {

    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(FacilitySubMasterDetails);