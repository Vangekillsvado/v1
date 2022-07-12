import {consultations} from './Consultations'
import {followUps} from './FollowUp'
import { counselling } from './Counselling'

import { hello } from './hello.ts'

import * as bill from './BillingFunctions'

import { consultationCodes } from './ObjectConsultations'
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

    hello()
    
    console.log(consultationCodes[0].isValid(apt, filteredAppointments))

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

    
    temp = bill.specialVisitPremiums(temp, apt)
    //assumption is being made: that if no code is valid, then inpatient won't make one
    //we must be checking for inpatient within each code to not run into that issue
    
    code.push(temp)
    
    return code
}


