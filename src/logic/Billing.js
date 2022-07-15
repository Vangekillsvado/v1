import * as bill from './BillingFunctions'
// import lists, so we can iterate through them here
import { consultationCodes } from './ObjectConsultations'
import { counsellingCodes } from './counsellingObject'
import { followUpCodes } from './ObjectFollowUps'
// eslint-disable-next-line
import { specialVisitPremiumCodes } from './SpecialVisitPremiumsObjects'

/**
 * 
 * @param {apt} apt 
 * @param {Array} appointments 
 * @param {patient} patient 
 * @returns {Array} of billing codes
 */
export function billing(apt, appointments, patient){


    //afaik codes don't care about other ids, so might as well factor it out here
    let filteredAppointments = appointments.filter((app) => {return app.id == apt.id})

    let datum = {
        apt: apt,
        appointments: filteredAppointments,
        patient: patient,
    }
    //we use a list since we might have multiple codes
    let code = []

    let codeList = []

    switch(apt.aptType){ //grab the codes we need and only the ones we need 
        case 'Consultation':
            codeList = consultationCodes
            break

        case 'Follow Up': 
            codeList = followUpCodes
            break

        case 'Counselling':
            codeList = counsellingCodes
            break
            
        default:
            alert('We should not see this')
            break
    }

    //create null code to be returned if nothing works / as placeholder
    let tempCode = {
        price: 0,
        code: 'error code'
    }

    //now iterate through previous list to find code dynamically
    for (let i = 0 ; i < codeList.length ; i++){
        //if we find valid, higher billing code, then swap it for tempCode
        if (codeList[i].isValid(datum) && codeList[i].price > tempCode.price) tempCode = codeList[i]
    }


    console.log(tempCode.code)
    //now we have the code, we just need to focus on premiums


    //K013 cannot be used with any other code or premium, so
    //if we get that one we just return
    if (tempCode.code == 'K013') return [tempCode.code]

    //adds the prefix, i.e 345 -> A345
    let billingCode = bill.specialVisitPremiums(tempCode.code, apt) //returns a strings
    //assumption is being made: that if no code is valid, then inpatient won't make one
    //wait...I think we check for apt.aptType == inpatient where that is the case, so that
    //assumption is both false and not relevant
    //we must be checking for inpatient within each code to not run into that issue
    
    code.push(billingCode)

    let premCode = getCode(specialVisitPremiumCodes, datum)
    console.log(premCode)

    return code
}
// eslint-disable-next-line 
function getCode(codeList, datum){
    // debugger
    let temp = {
        code: '000',
        price: 0,
    }
    for (let i = 0 ; i < codeList.length ; i++){
        //if we find valid, higher billing code, then swap it for tempCode
        if (codeList[i].isValid(datum) && codeList[i].price > temp.price) temp = codeList[i]
    }
    return temp
}


