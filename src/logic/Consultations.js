// module.exports = {
//     bill : consultations
// }

/**
 * 
 * @param {*} apt 
 * @param {Array} appointments 
 * @returns {String} the billing code
 */
export function consultations(apt, appointments){

    if(C345(apt, appointments)){
      return "345"
    }
    else if(C745(apt)){
      return "745"
    }
    else return ''
}

import * as bill from './BillingFunctions' 

  //1. segregate codes by type 
  //2. each type will be a set of objects
  //3. codes will be a set of methods, all of which must return true
  function C345(apt, appointments){
  
    //Full (345) – max 1/ 24 months period 
    
    let minimumTime = 2*365 //the minimum time allowed changes based on patientType

    if (apt.patientType == 'ed' || apt.patientType == 'inpatient'){
      minimumTime /= 2 ;
    }

   //grab all apts within 2 years with same diagnosis and cr code
     let relevantApts = appointments.filter(function(app){
      return (app.diagnosis == apt.diagnosis && app.code.substring(1) == '345') //check last characters of code
    })
   console.log("Apts: ",relevantApts)
    let found = false
    for (let i = 0 ; i < relevantApts.length ; i++){
      
      if (Math.abs(bill.daysBetween(apt.date, relevantApts[i].date)) <= minimumTime){
        found = true
        console.log('too frequent')
        console.log('date',apt.date, 'hist',relevantApts[i])
        console.log(i)
        console.log(bill.daysBetween(apt.date, relevantApts[i].date))

    
      }
    }
    //unless >12 months<24 months different diagnosis 
    //grab all apts in between 1 and 2 yrs (1 < d < 2)
    relevantApts = appointments.filter(function(app){
      return ((app.id == apt.id && app.diagnosis != apt.diagnosis) && app.id == "C345")
    })
   
    //console.log(relevantApts.length, "length ")

  


    for(let i = 0 ; i < relevantApts.length ; i++){
      console.log(i)
      console.log(Math.abs(bill.distanceBetweenDates(apt.date, relevantApts[i].date)), "time ")
      if (Math.abs(bill.distanceBetweenDates(apt.date, relevantApts[i].date)) <= 31536000000){ //I think the 2 yrs is an unnecessary rule
      found = true
      console.log(relevantApts[i])
    }
    
    }
    //OR  for inpatient or ED patient 
    //interperting as if its tied to the last chris 
    return(!found)
  }
  
  function C745(apt){
    // Limited/ Repeat (745/346) – must be referred back and have had care by another MD in the interim
    return(apt.refStatus == "Yes")
  }
