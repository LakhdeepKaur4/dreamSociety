
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getServiceType} from '../../../actionCreators/serviceMasterAction';
import { addVendorMaster,getRateType } from '../../../actionCreators/vendorMasterAction';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import UI from '../../../components/newUI/vendorDashboardInside';
import $ from 'jquery';


class vendorMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorName: '',
            serviceName: '',
            rateType:'',
            rate1:'',
            rate2:'',
            rate3:'',
            service:{
                serviceId:'',
            },
            service1:{
                serviceId:''
            },
            service2:{
                serviceId:''
            },
            rateType1:{
                rateId:''
            },
            rateType2:{
                rateId:''
            },
            rateType3:{
                rateId:''
            },
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
        this.props.getRateType();

    }

    getDropDown = ({item}) => {
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

    getRate = ({rate}) => {
        if (rate) {
            return rate.rate.map((item) => {
                return (
                    <option key={item.rateId} value={item.rateId}>
                        {item.rateType}
                    </option>
                )
            })
        }

    }



    // onSubmit = (event) => {
    //     event.preventDefault();
    //     this.props.addVendorMaster(this.state);
    //     this.setState(
    //         {
    //             vendorName: '',
    //             serviceName: '',
    //             serviceId: '',
    //             description: ''
    //         }

    //     )
    //     this.props.history.push('/superDashboard/displayVendorMaster')
    // }
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

                    <Form>
                        
                        <div style={{cursor:'pointer'}}  className="close" aria-label="Close" onClick={this.close}>
                         <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{textAlign:'center',  marginBottom: '10px'}}>Add Vendor</h3></div>

                            <FormGroup>
                                <Label>Vendor Name</Label>
                                <Input type="text"  placeholder="Vendor Name"  name="vendorName"  maxLength={20} value={this.state.vendorName}  onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  required />
                            </FormGroup>

                                <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label> Service Type 1</Label>
                                        <Input type="select" id="serviceId"  value={this.state.service.serviceId} onChange={(e) => {
                                            this.setState({service:{ serviceId:  e.target.value }})
                                            }} required >
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getDropDown(this.props.displayServiceMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label> Rate Type 1</Label>
                                        <Input type="select" value={this.state.rateType1.rateId} onChange={(e) => {
                                            this.setState({rateType1:{ rateId:  e.target.value }})
                                            }} required>
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getRate(this.props.vendorMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label> Rate 1</Label>
                                        <Input type="text"  placeholder="Rate"  name="rate1"  maxLength={4} value={this.state.rate1}  onChange={this.handleChange}  required />
                                    </FormGroup>
                                </Col>
                                </Row>

                                <Row form>
                                 <Col md={6}>
                                    <FormGroup>
                                        <Label> Service Type 2</Label>
                                        <Input type="select"  value={this.state.service1.serviceId} onChange={(e) => {
                                            this.setState({service1:{ serviceId:  e.target.value }})
                                            }} required >
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getDropDown(this.props.displayServiceMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                               
                                <Col md={4}>
                                    <FormGroup>
                                        <Label> Rate Type 2</Label>
                                        <Input type="select" value={this.state.rateType2.rateId} onChange={(e) => {
                                            this.setState({rateType2:{ rateId:  e.target.value }})
                                            }} required>
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getRate(this.props.vendorMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label> Rate 2</Label>
                                        <Input type="text"  placeholder="Rate"  name="rate2"  maxLength={4} value={this.state.rate2}  onChange={this.handleChange}  required />
                                    </FormGroup>
                                </Col>
                                </Row>

                                <Row form>
                                <Col md={6}>
                                <FormGroup>
                                        <Label> Service Type 3</Label>
                                        <Input type="select" value={this.state.service2.serviceId} onChange={(e) => {
                                            this.setState({service2:{ serviceId:  e.target.value }})
                                            }} required >
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getDropDown(this.props.displayServiceMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                <FormGroup>
                                        <Label> Rate Type 3</Label>
                                        <Input type="select" value={this.state.rateType3.rateId} onChange={(e) => {
                                            this.setState({rateType3:{ rateId:  e.target.value }})
                                            }} required>
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getRate(this.props.vendorMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label> Rate 3</Label>
                                        <Input type="text"  placeholder="Rate"  name="rate3"  maxLength={4} value={this.state.rate3}  onChange={this.handleChange}  required />
                                    </FormGroup>
                                </Col>
                                </Row>
                   
                                    <select onchange="toggleDisability(this);" class="mySelect" id="mySelect1">
                                        <option>Apple</option>
                                        <option>Banana</option>
                                        <option>Orange</option>
                                    </select>
                                    <select onchange="toggleDisability(this);" class="mySelect" id="mySelect2">
                                        <option>Hamburger</option>
                                        <option>Pizza</option>
                                        <option>Cola</option>
                                    </select>               
                                                    </Form>
                            
{/* 
                           
                            <div className="mt-4">
                                <Button type="submit" color="success"  className="mr-2" value="submit">Submit</Button>

                                <Link  to='/superDashboard/displayVendorMaster'>
                                    <Button color="danger"  className="btn">Cancel</Button>
                                </Link>
                            </div> */}
                        
       
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

    return bindActionCreators({ getServiceType, addVendorMaster,getRateType}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(vendorMaster);

