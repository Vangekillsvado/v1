import {consultations} from './Consultations'
import {followUps} from './FollowUp'

/**
 * 
 * @param {apt} apt 
 * @param {Array} appointments 
 * @param {patient} patient 
 * @returns {String} the billing code
 */
export function billing(apt, appointments, patient){





    if (apt.aptType == 'Consultation'){
        //  console.log(Consultation.bill(apt, appointments))
        return consultations(apt, appointments)
        //console.log(consultations(apt, appointments))
    }
    else if (apt.aptType == 'Follow Up'){
        return followUps(apt, patient, appointments)
    }

}


