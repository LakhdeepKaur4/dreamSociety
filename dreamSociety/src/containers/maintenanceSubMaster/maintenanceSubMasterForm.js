import React, {Component} from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Button, Input, Label  } from 'reactstrap';
import { getMaintenanceSubSize,postMaintenanceSubMaster, getMaintenanceType } from '../../actionCreators/maintenanceSubMasterAction';
import Spinner from '../../components/spinner/spinner';
import '../../r-css/w3.css';
import DefaultSelect from '../../constants/defaultSelect';
import UI from '../../components/newUI/superAdminDashboard';


class MaintenanceSubMasterForm extends Component{
    constructor(props){
        super(props);
        this.state={
            maintenanceId:'',
            sizeId:'',
            rate:'',
            errors:{},
            loading:true,
            subMaintenanceErr:''
        }
    }

    componentDidMount(){
        this.props.getMaintenanceSubSize().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getMaintenanceType().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z_]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    emailValid(event) {
        const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    fetchSize({size}){
        if(size){
            return size.map((sizeItem) => {
                return (
                    <option key={sizeItem.sizeId} value={sizeItem.sizeId}>{sizeItem.sizeType}</option>
                );
            });
        }
    }

    fetchMaintenanceType({maintenanceType}){
        if(maintenanceType){
           return maintenanceType.maintenance.map((item) => {
               return (
                   <option key={item.maintenanceId} value={item.maintenanceId}>{item.category}</option>
               )
           })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        if(!this.state.sizeId){
            errors.sizeId = `Please select size.`
        }
        if(!this.state.maintenanceId){
            errors.maintenanceId = `Please select Maintenance Type.`
        }
        if(this.state.rate === '') errors.rate = `Please write price.`
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            this.setState({loading: true});
            this.props.postMaintenanceSubMaster({...this.state})
            .then(() => this.props.history.push('/superDashboard/MaintenanceSubMasterDetails'))
            .catch(err => {err
                this.setState({loading:false, subMaintenanceErr: err.response.data.message})
            });
        }
        
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }


    rateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value,subMaintenanceErr:''});
        }
    }

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors,subMaintenanceErr:'' });
        }
        else{
            this.setState({[e.target.name]:e.target.value,subMaintenanceErr:''});
        }
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    route = () => {
        this.props.history.push('/superDashboard/MaintenanceSubMasterDetails');
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    render(){
        let formData = <div>
            <div><span className="error">{this.state.subMaintenanceErr}</span></div>
            <FormGroup>
                <Label>Mainenance Type</Label>
                <Input type="select" defaultValue="no-value" name='maintenanceId' value={this.state.maintenanceType}
                onChange={this.onChange}>
                <DefaultSelect />
                {this.fetchMaintenanceType(this.props.MaintenanceSubMaster)}
                </Input>
                <div><span className="error">{this.state.errors.maintenanceId}</span></div>
            </FormGroup>
            <FormGroup>
                <Label>Size Type</Label>
                <Input type="select" defaultValue="no-value" name="sizeId" value={this.sizeId}
                    onChange={this.onChange}>
                    <DefaultSelect />
                    {this.fetchSize(this.props.MaintenanceSubMaster)}
                </Input>
                <div><span className="error">{this.state.errors.sizeId}</span></div>
            </FormGroup>
            <FormGroup>
                <FormGroup>
                    <Label>Rate</Label>
                    <Input name="rate" onChange={this.rateChange}
                    value={this.state.rate} placeholder="Enter Price" maxLength="16"/>
                    <div>{!this.state.rate ? <span className="error">{this.state.errors.rate}</span>: null}</div>
                </FormGroup>
            </FormGroup>
            <Button color="success" className="mr-2">Add</Button>
            <Button  color="danger" onClick={this.route}>Cancel</Button>
        </div>
        return(
            <UI onClick={this.logout}  change={this.changePassword}>
                <Form onSubmit={this.onSubmit}>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <h3 style={{textAlign:'center', marginBottom: '15px'}}>Maintenance Sub Master Form</h3>
                        {!this.state.loading ? formData: <Spinner />}
                    </div>
                </Form>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        MaintenanceSubMaster: state.MaintenanceSubMaster
    }
}

export default connect(mapStateToProps, {
    getMaintenanceSubSize,
    postMaintenanceSubMaster,
    getMaintenanceType
})(MaintenanceSubMasterForm);