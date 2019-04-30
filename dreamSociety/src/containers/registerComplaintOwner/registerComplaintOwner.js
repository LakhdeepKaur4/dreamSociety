import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getServiceType} from '../../actionCreators/serviceMasterAction';
import {userflatDetails} from '../../actionCreators/registerComplainAction';
import UI from '../../components/newUI/ownerDashboard';
import {Form, Button,  FormGroup,  Input, Label,Row, Col } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';


class RegisterComplaint extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            flatDetailId:'',
            serviceId:'',
            date:'',
            slotTime1:'',
            slotTime2:'',
            slotTime3:'',
            description:'',
            errors: {},
            message:'',
           

            menuVisible: false,
         }
    }

    
    componentDidMount=()=>{
        this.refreshData()     
    }

    refreshData=()=>{
         this.props.getServiceType().then(() => this.setState({loading: false}));
         this.props.userflatDetails().then(() => this.setState({loading: false}));
        
    }

    service({item}){
        if(item){
           return( 
            item.map((item) =>{ 
                   return(
                       <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName}
                       </option>
                   )
               })
           )
            
        }
    }

    userflatDetails({userFlat}){
        if(userFlat){
            console.log(userFlat)
            return( 
                userFlat.flats.map((item) =>{ 
                    return(
                        <option key={item.flatDetailId} value={item.flatDetailId}>
                         {"Flatno-"+item.flatNo+", "+item.tower_master.towerName+", "+item.floor_master.floorName+" floor"}
                        </option>
                    )
                })
            )
             
         }
    }

    minDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }



    handleSubmit=(e)=>{
        e.preventDefault();

        let errors = {};
        
        if(!this.state.flatDetailId) {
            errors.flatDetailId = "cant be empty";
        }

       

        else if(this.state.serviceId ==='') {
            errors.serviceId = "cant be empty";
        }

        else if(this.state.priority==='') {
            errors.priority = "cant be empty";
        }

        else if(this.state.slotTime1 ==='') {
            errors.slotTime1 = "cant be empty";
        }

        else if(this.state.description === '') {
            errors.description = "cant be empty";
        }
   
        this.setState({ errors });
        console.log("submited===========================", this.state);
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
        return this.props.history.replace('/ownerDashboard')
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({message:'' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    
    



    render(){
        let formData=<div>
             
             <FormGroup>
                <Label>Flat no</Label>
                <Input type="select" defaultValue='no-value' name="flatDetailId"  onChange={this.onChange} >
                    <DefaultSelect />
                    {this.userflatDetails(this.props.registerComplaintReducer)}
                </Input >
                <span className='error'>{this.state.errors.flatDetailId}</span>
            </FormGroup>
         

             <FormGroup>
                <Label>Service Type</Label>
                <Input type="select" defaultValue='no-value' name="serviceId"  onChange={this.onChange}>
                    <DefaultSelect />
                    {this.service(this.props.displayServiceMasterReducer)}
                </Input >
                <span className='error'>{this.state.errors.serviceId}</span>
            </FormGroup>

                 
            <FormGroup>
                <Label>Priority</Label>
                <Input type="select" defaultValue='no-value' name="priority"  onChange={this.onChange}>
                    <DefaultSelect />
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </Input >
                <span className='error'>{this.state.errors.priority}</span>
            </FormGroup>

                 
            <FormGroup>
                <Label>Date</Label>
                <Input type="date" min={this.minDate()} name="date"  onChange={this.onChange}>
                    <DefaultSelect />
                    {/* {this.service(this.props.displayServiceMasterReducer)} */}
                </Input >
                <span className='error'>{this.state.errors.date}</span>
            </FormGroup>

            
            <Row form>
                
                <Col md={12}>
                <FormGroup>
                    <Label>Slot Time 1</Label>
                    <Input type="time"  name="slotTime1" onChange={this.onChange} >
                    <span className='error'>{this.state.errors.startTime1}</span>
                    </Input>
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                
                <Col md={12}>
                <FormGroup>
                    <Label>Slot Time 2</Label>
                    <Input type="time"  name="slotTime12" onChange={this.onChange} >
                    </Input>
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                
                <Col md={12}>
                <FormGroup>
                    <Label>Slot Time 3</Label>
                    <Input type="time"  name="slotTime3" onChange={this.onChange} >
                    </Input>
                </FormGroup>
                </Col>
                </Row>




            <FormGroup>
                <Label>Description</Label>
                <Input type="textarea"  name="description" maxLength={500} onChange={this.onChange}>
                </Input >
                {/* <span className='error'>{this.state.errors.description}</span> */}
            </FormGroup>

            <FormGroup>
                <Button type="submit" color="success" className="mr-2">Register</Button>
            </FormGroup>
        </div>
        return(
            <div>
               <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Register Complaint</h3>
                        {!this.state.loading ? formData : <Spinner />}

                    </Form>
                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        displayServiceMasterReducer :state.displayServiceMasterReducer,
        registerComplaintReducer : state.registerComplaintReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getServiceType,userflatDetails }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(RegisterComplaint));