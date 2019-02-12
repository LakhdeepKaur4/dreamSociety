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

            </FormGroup>

            <FormGroup>
                <Label for="firstName">firstName</Label>
                <Input id="firstName" name={props.firstNameInputName} value={props.firstNameValue} onChange={props.firstNameValueChange} />
            </FormGroup>
            <FormGroup>
                <Label for="lastName">lastName</Label>
                <Input id="lastName" name={props.lastNameInputName} value={props.lastNameValue} onChange={props.lastNameValueChange} />

            </FormGroup>
            <FormGroup>
                <Label for="Username">Username</Label>
                <Input id="Username" name={props.userNameInputName} value={props.userNameValue} onChange={props.userNameValueChange} />
            </FormGroup>
            <FormGroup>
                <Label for="email">email</Label>
                <Input id="email" name={props.emailInputName} value={props.emailValue} onChange={props.emailValueChange} />
            </FormGroup>
            <FormGroup>
                <Label for="contact">contact</Label>
                <Input id="contact" name={props.contactInputName} value={props.contactValue} onChange={props.contactValueChange} />
            </FormGroup>
            <FormGroup>
                <Button color="primary" onClick={props.updateUserClick}>Update User</Button>
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </FormGroup>

        </ModalBody>
        
    </Modal>
);

export default editUserModal;