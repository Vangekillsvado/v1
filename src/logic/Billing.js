import * as bill from './BillingFunctions'
// import lists, so we can iterate through them here
import { consultationCodes } from './ConsultationCodes'
import { counsellingCodes } from './CounsellingCodes'
import { followUpCodes } from './FollowUpCodes'
// eslint-disable-next-line
import { specialVisitPremiumCodes } from './SpecialVisitCodes'

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
        apt: apt, //got from form, don't touch
        appointments: filteredAppointments, //either before being passed in, or here, a backend call would need to happen
        patient: patient, //again, either before being passed in, or here, backend call has to happen
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

    
     let tempCode = getCode(codeList, datum)//= {
   

    //K013 cannot be used with any other code or premium, so
    //if we get that one we just return
    if (tempCode.code == 'K013') return [tempCode.code]

    //adds the prefix, i.e 345 -> A345
    let billingCode = bill.specialVisitPremiums(tempCode.code, apt) //returns a strings
    
    
    code.push(billingCode)

    // debugger
    //WIP
    // eslint-disable-next-line
    let premCode = getCode(specialVisitPremiumCodes, datum)
    //if valid code is returned, add it to list
    if(premCode.price) code.push(premCode.code) 

    return code
}

/**
 * Returns highest paying valid billing code
 * @param {Array} codeList 
 * @param {Object} datum 
 * @returns the code object
 */
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


