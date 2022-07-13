import * as bill from './BillingFunctions' 


export function data(){
    return consultationCodes
}




//a list of all codes 
let consultationCodes = [
    {
        name: 'Consultation',
        code: '345',
        price: 152.40,
        category: 'Consultation',
        isValid({apt, appointments}){

            
            let relevantApts = appointments.filter(function(app) {
               
                for (let i = 0 ; i < app.code.length ; i++){ //since codes are stored as an array
                    if(app.code[i].toString().substring(1)=='345') {return true} //we cycle through to see if there are any 345 codes
                    console.log(app.code[i].toString().substring(1), 'the code')
                } //in the array 
            })
            for (let i = 0 ; i < relevantApts.length ; i++){ //diff diagnosis, inpatient and ed are once per year, same diagnosis
                if(apt.diagnosis != relevantApts[i].diagnosis || apt.aptType == 'inpatient' || apt.aptType == 'ed'){ //is once per 2 years
                    if(bill.daysBetween(apt.date, relevantApts[i].date) < 365) 
                        return false
                    
                }
                else{ //same diagnosis && not ed/inpatient is implief from failing prev if statement
                    if(bill.daysBetween(apt.date, relevantApts[i].date)<730) 
                        return false
                }
            }
            return true //if we do not find anything wrong, we return true
        }
    },
    {
        name: 'Limited Consultation',
        code:'745',
        price: 99.30,
        category: 'Consultation',
        isValid({apt}){return(apt.refStatus == "Yes")}
    },
]

export {consultationCodes}


