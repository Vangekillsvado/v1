import * as bill from './BillingFunctions' 


let specialVisitPremiumCodes = [ //might possible want to add tags, as there are factors like travelling that
//I think are mutually exclusive
//AS OF RIGHT NOW, DATES ARE ALL ONE DAY OFF
//HOPING THIS WILL BE FIXED WITH BACKEND INTEGRATION, SO I AM JUST GOING TO DO LOGIC WITH THE 
//DAYS BEING ONE OFF
    {
        name: 'Travel Premium for 17:00-24:00 Monday - Friday',
        code: 'C102',
        price: 36.40,
        isValid({apt}){  
            let hours = apt.endTime.substring(0,2)
            let day = apt.date.getDay()

            return (apt.didTravel && hours >= 17 && hours < 24 ** day <= 5 && day > 0) //between 5pm and 12 am mon-fri
        }
    },
    {
        name: 'Travel Premium for 07:00-24:00 Sat, Sun, & Holidays',
        code: 'C103',
        price: 36.40,
        isValid(){
            //gonna have to make a list of acceptable holidays
            return false
        }
    },
    {
        name: 'Travel Premium for 00:00-07:00',
        code: 'C104',
        price: 36.40,
        isValid({apt}){
            let hours = apt.endTime.substring(0,2)

            return (apt.didTravel && (hours < 7 || hours == 7 && apt.endTime.substring(3,5) == 0))
        }
    },
    {
        name: 'First Person seen 17:00-24:00 Monday - Friday',
        code: 'C109',
        price: 60.00,
        isValid({apt, appointments}){

            //if apt isn't valid, return 
            if (apt.endTime.substring(0,2) < 17 || //before 5
            apt.date.getDay() > 5 || //saturday
            apt.date.getDay() == 0){ //sunday
                return false //this appointment isn't valid to begin with
            }
            // console.log(apt.date.getDay())
            //could not get array.filter to work for the life of me, hence the for loop
            for (let i = 0 ; i < appointments.length ; i++){
                if(bill.daysBetween(appointments[i].date, apt.date)==0 && //appointments today
                appointments[i].endTime.substring(0,2) >= 17 ){ //past five
                    //we've found a violating element
                    return false
                }
            }
            //if we didn't find any violating elements, code is valid
            return (true)
        }
    },
    {
        name: 'First Person seen 07:00-24:00 Sat, Sun, & Holidays',
        code: 'C108',
        price: 75.00,
        isValid(){
            return false
        }
    },
]

export {specialVisitPremiumCodes}