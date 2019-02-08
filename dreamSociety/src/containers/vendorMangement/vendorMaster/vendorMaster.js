import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { addVendorMaster } from '../../../actionCreators/vendorMasterAction';
import { Link } from 'react-router-dom';

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
                <UI onClick={this.logout}>
                  
                    <div className="form1 col-8">
                        <form onSubmit={this.onSubmit}>
                        <div style={{textAlign: 'center',fontWeight: 'bold' }}><label>Vendor Master</label></div>
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
