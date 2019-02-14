import React, {Component} from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Button, Input, Label,  } from 'reactstrap';
import { getMaintenanceSubSize,postMaintenanceSubMaster } from '../../actionCreators/maintenanceSubMasterAction';
import Spinner from '../../components/spinner/spinner';
import '../../r-css/w3.css';
import UI from '../../components/newUI/superAdminDashboard';

class MaintenanceSubMasterForm extends Component{
    constructor(props){
        super(props);
        this.state={
            sizeId:'',
            rate:'',
            errors:{},
            loading:false
        }
    }

    componentDidMount(){
        this.props.getMaintenanceSubSize();
    }

    fetchSize(size){
        if(size){
            console.log(size)
            return size.map((sizeItem) => {console.log(sizeItem.sizeType)
                return (
                    <option key={sizeItem.sizeId} value={sizeItem.sizeId}>{sizeItem.sizeType}</option>
                )
            });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        if(!this.state.sizeId){
            errors.sizeId = `Please select size.`
        }
        if(this.state.rate === '') errors.rate = `Please write price.`
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            console.log(this.state);
            this.props.postMaintenanceSubMaster({...this.state})
            .then(() => this.props.history.replace('/superDashboard/MaintenanceSubMasterDetails'));
            this.setState({sizeId:'',rate:''});
        }
        
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }


    rateChange = (e) => {
        console.log(this.state)
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});
        }
    }

    onChange = (e) => {
        console.log(this.state)
        if (!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else{
            this.setState({[e.target.name]:e.target.value});
        }
    }

    route = () => {
        this.props.history.push('/superDashboard/MaintenanceSubMasterDetails');
    }

    render(){
        let formData = <div>
            <FormGroup style={{display:'flex', justifyContent:'spaceBetween'}}>
                <FormGroup className="mr-3">
                <Input type="select" name="sizeId" value={this.state.maintenanceId}
                    onChange={this.onChange}>
                    <option>-- Select Size --</option>
                    {this.fetchSize(this.props.MaintenanceSubMaster)}
                </Input>
                <div><span>{this.state.errors.sizeId}</span></div>
                </FormGroup>
                <FormGroup>
                    <Input name="rate" onChange={this.rateChange}
                    value={this.state.rate} maxLength="12" placeholder="Enter Price"/>
                    <div>{!this.state.rate ? <span>{this.state.errors.rate}</span>: null}</div>
                </FormGroup>
            </FormGroup>
            <Button color="success" className="mr-2">Add User</Button>
            <Button  color="danger" onClick={this.route}>Cancel</Button>
        </div>
        return(
            <UI>
                <Form onSubmit={this.onSubmit}>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <h3 style={{textAlign:'center', marginBottom: '15px'}}>Maintenance Sub Master Form</h3>
                        {formData}
                    </div>
                </Form>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        MaintenanceSubMaster: state.MaintenanceSubMaster.size
    }
}

export default connect(mapStateToProps, {getMaintenanceSubSize,
    postMaintenanceSubMaster})(MaintenanceSubMasterForm);