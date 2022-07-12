//FOLLOW UPS 

import * as bill from './BillingFunctions'


/**
 * 
 * @param {Object} apt The appointment object
 * @param {Object} patient The patient object
 * @param {array} appointments The list of appointments
 * @returns {String} The billing code
 */
export function followUps(apt, patient, appointments){



    let code = ''

    switch(apt.asmtType){
        case '343':
            if(C343(apt, patient, appointments)) code = "343"
            break
        case '341':
            if(C341(appointments)) code = '341' 
            break
        case '340':
            if(C340(appointments))code = '340'
            break
        case '348':
            code = 'C348' //no function as no max, no logic needed to determine
            break
        default:
            alert('Something went wrong with the switch cases in the follow up')

    }
   
    //if(C343(apt, patient, appointments)) return "C343"
    return code
  }

function C343(apt, patient, appointments){
    //Medical Specific Assessment (343) – max 1/ yr unless second unrelated diagnosis, then 2/yr OR if >90 
    //days and assessment for hospital admission

    //grab all of these patients apts
    let relevantApts = appointments.filter(function(app){
      return (app.id == apt.id && app.code=='C343')
    })

    let found = false
    let freq = 0 //frequency is 0 based, so it's checked at 1


    // ADD 343+341 = max of 4/yr

    for (let i = 0 ; i < relevantApts.length ; i++){ 
      
        // if within one year, check asmt status, 
        if (Math.abs(bill.daysBetween(apt.date, relevantApts[i].date)) <= 365 &&   //within one year
          relevantApts[i].diagnosis == apt.diagnosis){     //same diagnosis

            console.log('frequency', freq)                 
            //then check to see if more then 90 days and assessed for hospital admission                                                           //assessment for hospital admission
            if(bill.daysBetween(apt.date, relevantApts[i].date) >= 90 &&                  //more then 90 days
            apt.assessedAdmission){              
                if (freq >= 1){ //if we have already billed this code twice, then we can't again
                    console.log(1, 'overflow')
                    return false
                }
                freq+=1 //increment here as to not change before we check, and also to try and factor it out of the other if statements
            }
            else {
                console.log(2)               
                console.log(apt.assessedAdmission)
                return false //if not within 90 days, return false
            }
            
        }

        else if ((Math.abs(bill.daysBetween(apt.date, relevantApts[i].date)<= 365) //within one year
        && relevantApts[i].diagnosis != apt.diagnosis) ){                                       //different diagnosis
          console.log(2)
           // 2 per year
          if (freq >= 1){
            console.log(2)
            return false
          }
          freq+=1

        // console.log((bill.daysBetween(apt.date, relevantApts[i].date) <= 90 && apt.assessedAdmission))
        // console.log('hello')
        }
    }

    return (!found)
  }

/**
 * 
 * @param {apt} apt 
 * @param {Array} appointments 
 * @returns {boolean} appointment validity
 */ 
function C341(appointments){

    //get relevant apps, if length is *3* or longer, reject
   
    return (appointments.filter ((app) => {return (app.code == 'C341' || app.code == 'C343')}).length < 4)

}

/**
 * 
 * @param {Array} appointments 
 * @returns  {boolean} validity of C340
 */
function C340(appointments){
    //grab relevant apps, less then 2 since we don't want to bill if there are two, as max of 2
    return (appointments.filter ((app) => {return (app.code == 'C340')}).length < 2)
}

