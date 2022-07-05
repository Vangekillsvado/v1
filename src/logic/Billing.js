import {consultations} from './Consultations'
import {followUps} from './FollowUp'


export function billing(apt, appointments, patient){

    console.log('ehhhh')
    console.log(appointments, patient)
    //console.log(apt.aptType)
        if (apt.aptType == 'Consultation'){
          //  console.log(Consultation.bill(apt, appointments))
          return consultations(apt, appointments)
          //console.log(consultations(apt, appointments))
        }
        else if (apt.aptType == 'Follow Up'){
            console.log('foire')
            return followUps(apt, patient, appointments)
        }
        console.log(apt.aptType)
}


