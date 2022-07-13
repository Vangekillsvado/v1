import * as bill from './BillingFunctions' 


export function data(){
    return followUpCodes
}


//a list of all codes 
let followUpCodes = [
    {
        name: 'Medical Specific Assessment',
        code:'343',
        price:'77.55',
        isValid({apt, appointments}){
                //Medical Specific Assessment (343) – max 1/ yr unless second unrelated diagnosis, then 2/yr OR if >90 
            //days and assessment for hospital admission

            //grab all of these patients apts
            let relevantApts = appointments.filter(function(app){
                return (app.id == apt.id && app.code.toString().substring(1)=='343')
            })     
            let freq = 0 //frequency is 0 based, so it's checked at 1      
            // ADD 343+341 = max of 4/yr       
            for (let i = 0 ; i < relevantApts.length ; i++){ 
                
                // if within one year, check asmt status, 
                if (Math.abs(bill.daysBetween(apt.date, relevantApts[i].date)) <= 365 &&   //within one year
                    relevantApts[i].diagnosis == apt.diagnosis){     //same diagnosis
        
  
                    //then check to see if more then 90 days and assessed for hospital admission                                                           //assessment for hospital admission
                    if(bill.daysBetween(apt.date, relevantApts[i].date) >= 90 &&                  //more then 90 days
                    apt.assessedAdmission){              
                        if (freq >= 1){ //if we have already billed this code twice, then we can't again

                            return false
                        }
                        freq+=1 //increment here as to not change before we check, and also to try and factor it out of the other if statements
                    }

                    else {
                        return false //if not within 90 days, return false
                    }
                    
                }
        
                else if ((Math.abs(bill.daysBetween(apt.date, relevantApts[i].date)<= 365) //within one year
                    && relevantApts[i].diagnosis != apt.diagnosis) ){                                       //different diagnosis

                    // 2 per year
                    if (freq >= 1){

                    return false
                    }
                    freq+=1
                }
            } return true
        }
    },
    {
        name: 'Complex medical specific re-assessmet',
        price: 68.90,
        code: '341',
        isValid({appointments}){
            //get relevant apps, if length is *3* or longer, reject
   
    return (appointments.filter ((app) => {return (app.code.toString().substring(1) == '341' || app.code.toString().substring(1) == '343')}).length < 4)
        }
    },
    {
        name: 'Medical specific re-assessment',
        code: '340',
        price: 59.55,
        isValid({appointments}){
            return (appointments.filter ((app) => {return (app.code.toString().substring(1) == '340')}).length < 2)
        }

    },
    {
        name: 'Partial assessment',
        price: 36.25,
        code: '348',
        isValid(){
            return true
        }
    },
]

export {followUpCodes}

//this totally could and should be factored out, but we save that for a day
//when everything isn't breaking every five seconds 
