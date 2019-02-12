import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getTowerName,getFlatType,addFlatDetails} from '../../actionCreators/flatDetailMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import { Button, Modal, FormGroup, ModalBody, ModalHeader,Table, ModalFooter, Input, Label } from 'reactstrap';

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
            towerName:''
        }
    }


    handleChange=(event)=>  {
                   
        this.setState({[event.target.name]:event.target.value});
        console.log(event.target.value)
        
        
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
        console.log("jkj",this.state)
        event.preventDefault();
   
        this.props.addFlatDetails(this.state)
        
        this.setState(
        {
            state: {
                flatDetailId:'',
                flatNo:'',
                flatId:'',
                flatType:'',
                floor:'',
                towerId:'',
                towerName:''
             
                }
                 
        })  
                this.props.history.push('./flatDetails')
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
        console.log(flattype,"abc")
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

    render (){
        return(
            <UI onClick={this.logout}>
            <div >
                <form onSubmit={this.onSubmit}>
                <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Flat Details</h3></div>
                    <div >
                        <label>Flat No</label>
                        <input className ="form-control" type="text" name="flatNo" maxLength={3} onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.handleChange} value={this.state.flatNo} required></input>
                    </div>
                    <div >
                        <label>Flat Type</label>
                        <select required className ="form-control" value={this.state.flatId} name="flatType" onChange={(e)=> this.setState({flatId:e.target.value})} >
                        <option value="" disabled selected>--Select--</option>
                            {this.getDropdown1(this.props.flatDetailMasterReducer)}
                        </select>
                    </div>
                    <div >    
                        <label>Floor</label>
                        <input className ="form-control" type="text" name="floor" maxLength={10} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  value={this.state.floor} required></input>
                    </div>
                    <div >    
                        <label>Tower Name</label>
                        <select  required  className ="form-control" value={this.state.towerId} name="towerName" onChange={(e)=> this.setState({towerId:e.target.value})}>
                        <option value="" disabled selected>--Select--</option>
                            {this.getDropdown(this.props.flatDetailMasterReducer)}
                        </select>
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