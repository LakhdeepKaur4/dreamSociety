import React from 'react';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';

const editUserModal = (props) => (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Edit User</ModalHeader>
        <ModalBody>
            <FormGroup>
                <Label>Role</Label>
                <Input type="select" name={props.roleInputName}  id="roleName" value={props.roleNameValue} onChange={props.roleNameChange} >
                    <option value={props.selectedRoleNameValue}>{props.selectedRoleName}</option>
                    <option disabled>Select</option>
                    {props.fetchRoles}
                </Input>
                <span className="error">{props.roleNameError}</span>
            </FormGroup>

            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" onKeyPress={props.NameKeyPress} maxLength='25'
                    minLength='3' name={props.firstNameInputName} value={props.firstNameValue} onChange={props.firstNameValueChange} />
                <span className="error">{props.firstNameError}</span>
            </FormGroup>
            <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input id="lastName" name={props.lastNameInputName} 
                onKeyPress={props.NameKeyPress}
                maxLength='25'
                minLength='3'
                value={props.lastNameValue} onChange={props.lastNameValueChange} />
                <span className="error">{props.lastNameError}</span>
            </FormGroup>
            <FormGroup>
                <Label for="Username">Username</Label>
                <Input id="Username"
                onChange={props.userNameChange}
                maxLength='25'
                minLength='3'
                name={props.userNameInputName} value={props.userNameValue} onChange={props.userNameValueChange} />
                <span className="error">{props.userNameError}</span>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email"
                 maxLength='40'
                 minLength='10'
                 onKeyPress={props.emailKeyPress}
                 name={props.emailInputName} value={props.emailValue} onChange={props.emailValueChange}/>
                <span className="error">{props.emailError}</span>
            </FormGroup>
            <FormGroup>
                <Label for="contact">Contact</Label>
                <Input id="contact" onKeyPress = {props.contactValidation} name={props.contactInputName} value={props.contactValue} onChange={props.contactValueChange} />
                <span className="error">{props.contactError}</span>
            </FormGroup>
            <FormGroup>
                <Button type="submit" color="primary" onClick={props.updateUserClick}>Save</Button>{' '}
                <Button color="danger" onClick={props.toggle}>Cancel</Button>
            </FormGroup>
            

        </ModalBody>
        
    </Modal>
);

export default editUserModal;