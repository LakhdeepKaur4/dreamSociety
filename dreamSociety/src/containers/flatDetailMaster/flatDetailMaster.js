import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getTowerName,getFlatType,addFlatDetails} from '../../actionCreators/flatDetailMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import { Button, Modal, FormGroup, ModalBody, ModalHeader,Table, ModalFooter, Input, Label } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';

class flatDetailMaster extends Component{
    constructor(props){
        super(props);
        this.state={
            flatDetailId:'',
            flatNo:'',
            flatId:'',
            flatType:'',
            floor:'',
            towerId:'',
            towerName:'',
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
    

    componentDidMount(){
        this.props.getTowerName();
        this.props.getFlatType();
    }
    
    refreshData(){
        this.props.addFlatDetails();
    }


    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    onSubmit=(event)=> {
        event.preventDefault();
        const { flatNo,flatId,floor,towerId} = this.state;
        let errors={};
        if(this.state.flatNo===''){
            errors.flatNo="Flat No can't be empty"
        }
        else if(this.state.flatId===''){
            errors.flatId="Flat Type can't be empty"
        }
        else if(this.state.floor===''){
            errors.floor="Floor can't be empty"
        }
        else if(this.state.towerId===''){
            errors.towerId="Tower Name can't be empty"
        }
        this.setState({errors});
        const isValid=Object.keys(errors).length === 0;
        if(isValid){
            this.setState({loading:true});
            this.props.addFlatDetails(flatNo,flatId,floor,towerId);
            this.props.history.push('./flatDetails');
        }              
        console.log( flatNo,flatId,floor,towerId)
    }
           
    
    getDropdown=({name})=>{
        if(name){
            return name.map((item)=>{
                    return(
                        <option key={item.towerId} value={item.towerId} >
                        {item.towerName}</option>
                    )
                    
                })

                
            
        }
    }

    getDropdown1=({flattype})=>{
        if(flattype){
            return flattype.map((items)=>{
                return(
                    <option key={items.flatId} value={items.flatId}>
                    {items.flatType}
                    </option>
                )
            })
        }
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    
    push=()=>{
        this.props.history.push('/superDashboard/flatDetails')
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render (){
        return(
            <UI onClick={this.logout}>
            <div>
                <form onSubmit={this.onSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                <span aria-hidden="true">&times;</span>
            </div>

                <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Flat Details</h3></div>
                    <div>
                        <label>Flat No</label>
                        <input className ="form-control" placeholder="Flat No" type="text" name="flatNo" maxLength={3} onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.handleChange} value={this.state.flatNo} ></input>
                        <span className="error">{this.state.errors.flatNo}</span>
                    </div>
                    <div>
                        <label>Flat Type</label>
                        <select className ="form-control"  defaultValue='no-value' name="flatId" onChange={this.handleChange}>
                        <DefaultSelect/>
                            {this.getDropdown1(this.props.flatDetailMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.flatId}</span>
                    </div>
                    <div>    
                        <label>Floor</label>
                        <input className ="form-control" placeholder="Floor" type="text" name="floor" maxLength={10} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  value={this.state.floor}></input>
                        <span className="error">{this.state.errors.floor}</span>
                    </div>
                    <div>    
                        <label>Tower Name</label>
                        <select  required  className ="form-control"  defaultValue='no-value' name="towerId" onChange={this.handleChange}>
                        <DefaultSelect/>
                            {this.getDropdown(this.props.flatDetailMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.towerId}</span>
                    </div>
                    <div className="mt-4">
                    <Button type="submit" className="mr-2" color="success" value="submit">Submit</Button>
                    <Button color="danger" onClick={this.push}>Cancel</Button>
                    </div>
                </form> 
            </div>
            </UI>
        )
    }

}

function mapStateToProps(state){
    return{
    flatDetailMasterReducer : state.flatDetailMasterReducer
            }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getTowerName,getFlatType,addFlatDetails},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(flatDetailMaster);