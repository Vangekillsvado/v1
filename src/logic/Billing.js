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

    //THIS IS WHERE BACKEND API CALL SHOULD HAPPEN
    //APPOINTMENTS NEED TO BE HOOKED AND SET UP AS LIST OF OBJECTS
    //AND PATIENT OBJECT NEEDS TO HAVE PROPERTIES. 
    //THE FORM FOR BOTH CAN BE SEEN IN THE APP.VUE 
    // JAVASCRIPT. THEY ARE A LIST. 

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

    
     let tempCode = getCode(codeList, datum)//= {
   

    //K013 cannot be used with any other code or premium, so
    //if we get that one we just return
    if (tempCode.code == 'K013') return [tempCode.code]

    //adds the prefix, i.e 345 -> A345
    let billingCode = bill.specialVisitPremiums(tempCode.code, apt) //returns a strings
    
    
    code.push(billingCode)


    //WIP
    //let premCode = getCode(specialVisitPremiumCodes, datum)

   

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


