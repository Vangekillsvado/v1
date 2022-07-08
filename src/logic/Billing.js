import {consultations} from './Consultations'
import {followUps} from './FollowUp'
import { counselling } from './Counselling'

/**
 * 
 * @param {apt} apt 
 * @param {Array} appointments 
 * @param {patient} patient 
 * @returns {String} the billing code
 */
export function billing(apt, appointments, patient){

    let filteredAppointments = appointments.filter((app) => {return app.id == apt.id})


    let code = 'Null Code'
    switch(apt.aptType){
        case 'Consultation':
            code = consultations(apt, filteredAppointments)
            break
        case 'Follow Up':
            code = followUps(apt, patient, filteredAppointments)
            break
        case 'Counselling':
            code = counselling(apt, appointments)
            break
        default:
            alert('We should not see this')
            break
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


