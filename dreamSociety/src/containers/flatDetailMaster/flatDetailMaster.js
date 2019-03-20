import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getTowerName,getFlatType,addFlatDetails, getfloors} from '../../actionCreators/flatDetailMasterAction';
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
            loading:true,
            message:''
        }
    }


 
    handleChange = (event) => {
        this.setState({message:'' })
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
        this.refreshData();
    }
    
    refreshData(){
        this.props.getTowerName();
        this.props.getFlatType();
    }

    
    floorChange=(event)=>{
        this.setState({message:'' })
        let selected= event.target.value
        this.props.getfloors(selected);

        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9, a-zA-Z  -]$/;
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
        const { flatNo,flatId,floorId,towerId} = this.state;
        let errors={};
        if(this.state.flatNo===''){
            errors.flatNo="Flat No can't be empty"
        }
        else if(this.state.flatId===''){
            errors.flatId="Flat Type can't be empty"
        }
        else if(this.state.towerId===''){
            errors.towerId="Tower Name can't be empty"
        }

        else if(this.state.floorId===''){
            errors.floorId="Floor can't be empty"
        }
        this.setState({errors});
        const isValid=Object.keys(errors).length === 0;
        if(isValid){
            this.setState({loading:true});
            this.props.addFlatDetails(flatNo,flatId,floorId,towerId)
            .then(()=>
            this.push())
            .catch(err=>{
                this.setState({message: err.response.data.message, loading: true})
            
            })
                this.refreshData();
        }              
      
        
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
            return flattype.flat.map((items)=>{
                return(
                    <option key={items.flatId} value={items.flatId}>
                    {items.flatType}
                    </option>
                )
            })
        }
    }

    getFloorData=({floorDetails})=>{
      
        if(floorDetails){
            return floorDetails.tower.Floors.map((items)=>{
                return(
                    <option key={items.floorId} value={items.floorId}>
                    {items.floorName}
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

        
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }

    
    push=()=>{
        this.props.history.push('/superDashboard/flatDetails')
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render (){
        return(
            <UI onClick={this.logout} change={this.changePassword}>
            <div>
                <form onSubmit={this.onSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                <span aria-hidden="true">&times;</span>
            </div>

                <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Flat Details</h3></div>
                    <div>
                        <label>Flat No</label>
                        <input className ="form-control" placeholder="Flat No" type="text" name="flatNo" maxLength={5} onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.handleChange} ></input>
                        <span className="error">{this.state.errors.flatNo}</span>
                        <span className="error">{this.state.message}</span>  
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
                        <label>Tower Name</label>
                        <select  required  className ="form-control"  defaultValue='no-value' name="towerId" onChange={this.floorChange}>
                        <DefaultSelect/>
                            {this.getDropdown(this.props.flatDetailMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.towerId}</span>

                    </div>
                    <div>    
                        <label>Floor</label>
                        <select className ="form-control" placeholder="Floor"  defaultValue='no-value'  name="floorId" maxLength={10} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  value={this.state.floorId}>
                        <DefaultSelect/>
                        {this.getFloorData(this.props.flatDetailMasterReducer)}
                        </select>
                      
                        <span className="error">{this.state.errors.floorId}</span>
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
    return bindActionCreators({getTowerName,getFlatType,addFlatDetails, getfloors},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(flatDetailMaster);