import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addServiceType, getServiceDetail } from '../../../actionCreators/serviceMasterAction';
import { Button } from 'reactstrap';


import UI from '../../../components/newUI/vendorDashboardInside';



class serviceMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {

            serviceName: '',
            serviceDetailId: '',
            service_detail: '',
            menuVisible: false
        }

    }


    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        this.props.getServiceDetail();
    }

    refreshData() {
        this.props.addServiceType();
    }

    getDropdown = ({ detail }) => {
        if (detail) {
            return detail.service.map((item) => {
                return (
                    <option key={item.serviceDetailId} value={item.serviceDetailId} >
                        {item.service_detail}</option>
                )

            })



        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.addServiceType(this.state)

        this.setState(
            {
                state: {
                    serviceName: '',
                    serviceDetailId: '',
                    service_detail: ''

                }

            })

        this.props.history.push('/superDashboard/displayServices')




    }

    push=()=>{
        this.props.history.push('/superDashboard/displayservices')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }



    render() {

        return (
        <div>
            <UI onClick={this.logout}>
               
                <div>
                    <form onSubmit={this.onSubmit}>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                    <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Services</h3></div>
                        <div>
                            <label>Service Type</label>
                            <input type="text" placeholder="Service Type" className="form-control" name="serviceName" maxLength={30} value={this.state.serviceName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <label>Service Details</label>
                            <select className="form-control" value={this.state.serviceDetailId} onChange={(e) => this.setState({ serviceDetailId: e.target.value })} required>
                            <option value="" disabled selected>--Select--</option>
                                {this.getDropdown(this.props.serviceMasterReducer)}
                            </select>
                        </div>
                        <div className="mt-4">
                            <Button type="submit" color="success" className="mr-2" value="submit">Submit</Button>
                          
                                <Button color="danger" onClick={this.push}>Cancel</Button>
                       
                        </div>
                    </form>
                </div>
            </UI>
           

        </div>

        )
    }

}

function mapStateToProps(state) {
    console.log(state);
    return {
        serviceMasterReducer: state.serviceMasterReducer

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addServiceType, getServiceDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(serviceMaster);
