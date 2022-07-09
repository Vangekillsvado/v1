import {consultations} from './Consultations'
import {followUps} from './FollowUp'
import { counselling } from './Counselling'
import * as bill from './BillingFunctions'

/**
 * 
 * @param {apt} apt 
 * @param {Array} appointments 
 * @param {patient} patient 
 * @returns {String} the billing code
 */
export function billing(apt, appointments, patient){
    //afaik codes don't care about other ids, so might as well factor it out here
    let filteredAppointments = appointments.filter((app) => {return app.id == apt.id})

    //we use a list since we might have multiple codes
    let code = []
    let temp = '' //set to empty string so we can boolean it
    switch(apt.aptType){
        case 'Consultation':
            temp = consultations(apt, filteredAppointments)
            break
        case 'Follow Up': 
            temp = followUps(apt, patient, filteredAppointments)
            break
        case 'Counselling':
            temp = counselling(apt, appointments)
            break
        default:
            alert('We should not see this')
            break
    }

    if(!temp) temp = 'No Code'
    code.push(temp)
   // check whether code is compatible with e078
    if (patient.chronicDisease && bill.chronicDiseaseValidity(code[0])){
        code.push('E078')
    }

   
    return code


    // if (apt.aptType == 'Consultation'){
    //     //  console.log(Consultation.bill(apt, appointments))
    //     return consultations(apt, appointments)
    //     //console.log(consultations(apt, appointments))
    // }
    // else if (apt.aptType == 'Follow Up'){
    //     return followUps(apt, patient, appointments)
    // }


}


