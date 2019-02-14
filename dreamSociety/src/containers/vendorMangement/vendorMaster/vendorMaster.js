import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { addVendorMaster } from '../../../actionCreators/vendorMasterAction';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
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
                  
                    <div >
                        <form onSubmit={this.onSubmit}>
                        <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Vendor</h3></div>
                            <div>
                                <label>Vendor Name</label>
                                <input type="text" placeholder="Vendor Name"  className="form-control" name="vendorName" maxLength={20} value={this.state.vendorName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange} required></input>
                            </div>
                            <div>
                                <label>Service Type</label>
                                <select className="form-control" value={this.state.serviceId} onChange={(e) => {
                                    this.setState({ serviceId: e.target.value })
                                }} required>
                                      <option value="" disabled selected>--Select--</option>
                                    {this.getDropDowm(this.props.displayServiceMasterReducer)}
                                </select>
                            </div>
                            
                            <div>
                                <label>Description</label>
                                <input className="form-control" placeholder="Description" maxLength={50}  value={this.state.description} onChange={this.handleChange} type="text" name="description" required></input>
                            </div>
                            <div className="mt-4">
                                <Button type="submit" color="success" className="mr-2" value="submit">Submit</Button>

                                <Link to='/superDashboard/displayVendorMaster'>
                                    <Button color="danger" className="btn">Cancel</Button>
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
