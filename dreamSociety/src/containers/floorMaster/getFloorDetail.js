import React, { Component } from 'react';
import { getFloor ,deleteSelectedFloor} from '../../actionCreators/floorAction';
import { connect } from 'react-redux';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import '../../r-css/w3.css';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class GetFloorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isDisabled: true,
            ids: []
        }
    }
    componentDidMount() {
        this.props.getFloor();
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }
    route = () => {
        return this.props.history.replace('/superDashboard/getFloor')
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    fetchFloorDetails = ({ floor }) => {
        // console.log(floor)
        if (floor) {
            return floor.floor.map((floorDetail, i) => {
                // console.log(floorDetail)
                return (
                    <tr key={floorDetail.floorId}>
                        <td><input type="checkbox" name="ids" className="SelectAll" value={floorDetail.floorId}
                            onChange={(e) => {
                                let { floorId } = floorDetail
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    let indexOfId = this.state.ids.indexOf(floorId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1)
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true })
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, floorId] });
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }


                            }} /></td>
                        <td></td>
                        <td>{i + 1}</td>
                        <td>{floorDetail.floorName}</td>
                        <td>
                            <Button className="mr-2" color="success">Edit</Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                )
            })
        }

    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if (ar.length > 0) {
            this.setState({ isDisabled: false });
        }
    }

    unSelectAll = () => {

        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }

    }

    render() {
        let tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{ alignContent: 'baseline' }}></th>
                    <th>#</th>
                    <th>Floor Name</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>

                {this.fetchFloorDetails(this.props.FloorDetail)}
            </tbody>
        </Table>
            let deleteSelectedButton = <Button
            disabled={this.state.isDisabled}
            color="danger"
           className="mb-3"
           >Delete Selected</Button>

        return (
            <UI>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Floor Master Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Floor</Button>

                    </div>
                    {deleteSelectedButton}
                    <Label htmlFor="allSelect" style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}>Select All<input className="ml-2"
                        id="allSelect"
                        type="checkbox" onChange={(e) => {
                            if (e.target.checked) {
                                this.selectAll();
                            }
                            else if (!e.target.checked) {
                                this.unSelectAll();
                            }
                        }
                        } /></Label>
                    {tableData}

                </div>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        FloorDetail: state.FloorDetail
    }
}

export default connect(mapStateToProps, { getFloor ,deleteSelectedFloor})(GetFloorDetail);