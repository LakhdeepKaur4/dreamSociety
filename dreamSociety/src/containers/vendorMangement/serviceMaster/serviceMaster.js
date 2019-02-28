import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addServiceType, getServiceDetail } from '../../../actionCreators/serviceMasterAction';
import { Button } from 'reactstrap';
import DefaultSelect from '../../../constants/defaultSelect';


import UI from '../../../components/newUI/vendorDashboardInside';




class serviceMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {

            serviceName: '',
            serviceDetailId: '',
            service_detail: '',
            menuVisible: false,
            errors:{},
            loading:true
        }

    }


    handleChange = (event) => {

        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
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


    onSubmit = (e) => {
        e.preventDefault();
        const { serviceName,serviceDetailId} = this.state
        
        let errors = {};
        if(this.state.serviceName===''){
            errors.serviceName="Service Name can't be empty"
        }
      
        else if(this.state.serviceDetailId===''){
            errors.serviceDetailId="Service Details can't be empty"
        }
    
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.addServiceType( serviceName,serviceDetailId)
            this.props.history.push('/superDashboard/displayServices')
        }
        
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
                            <input type="text" placeholder="Service Type" className="form-control" name="serviceName" maxLength={30} value={this.state.serviceName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange} ></input>
                            <span className="error">{this.state.errors.serviceName}</span>
                        </div>
                        <div>
                            <label>Service Details</label>
                            <select className="form-control" name="serviceDetailId" defaultValue='no-value'  onChange={this.handleChange} >
                            <DefaultSelect/>
                                {this.getDropdown(this.props.serviceMasterReducer)}
                            </select>
                            <span className="error">{this.state.errors.serviceDetailId}</span>
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
