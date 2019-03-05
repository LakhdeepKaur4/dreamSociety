import axios from 'axios'
import { URN,ADD_FLAT_OWNER } from '../actions/index';
import { authHeader } from '../helper/authHeader';

export function addFlatOwner(data){
    // console.log('hughjgjhgjjlkl;k;',data)
    // console.log('hugh;',...d)
    console.log(...data)
    const data1={
        ownerName:data.ownerName,
        dob:data.DOB,
        contact:data.number,
        email:data.email,
        societyId:data.societyName,
        permanentAddress:data.permanentAddress,
        towerId:data.towerId,
        flatDetailId:data.flatDetailId,
        bankName:data.bankName,
        accountHolderName:data.holderName,
        accountNumber:data.accountNumber,
        panCardNumber:data.panNumber,
        IFSCCode:data.ifscCode,
        noOfMembers:data.familyMember,
        member:data.member,
        profilePicture:data.profilePicture
    }
    // const data2={
    //     data1,
    //     d
    // }
    // console.log(data1)

    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
const request=axios.post(`${URN}/owner`,data,{ headers: authHeader(),config })
.then(response=>response.data)
return {
    type:ADD_FLAT_OWNER,
    payload:request
}
}