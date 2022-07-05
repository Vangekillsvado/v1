//FOLLOW UPS 

import * as bill from './BillingFunctions'

export function followUps(apt, patient, appointments){
    console.log("Rick")
    if(C343(apt, patient, appointments)) return "C343"
    else return "Null Code"
  }

  function C343(apt, patient, appointments){
    //Medical Specific Assessment (343) – max 1/ yr unless second unrelated diagnosis, then 2/yr OR if >90 
    let relevantApts = appointments.filter(function(app){
      return (app.id == apt.id)
    })

    let found = false
    let freq = 0

    // INTERPERTS AS TWICE PER YEAR FOR 90 YEAR OLDS
    for (let i = 0 ; i < relevantApts.length ; i++){ 
        if ((Math.abs(bill.distanceBetweenDates(relevantApts[i].date, apt.date)) <= 31536000000 &&   //within one year
         relevantApts[i].diagnosis == apt.diagnosis &&                                          //same diagnosis
         bill.distanceBetweenDates(apt.date, patient.birthday) < 2838240000000) ){              //patient is less then 90
          console.log(1)
          return false
        }
        else if (Math.abs(bill.distanceBetweenDates(relevantApts[i].date, apt.date)) <= 31536000000 //within one year
        && relevantApts[i].diagnosis != apt.diagnosis){                                        //different diagnosis
          freq+=1 // 2 per year
          if (freq >= 2){
            console.log(2)
            return false
          }
        }
    }

    return (!found)
  }


