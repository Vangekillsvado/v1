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

            return (hours >= 17 && hours < 24 ** day <= 5 && day > 0) //between 5pm and 12 am mon-fri
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
        isValid(){
            return false
        }
    },
    {
        name: 'First Person seen 17:00-24:00 Monday - Friday',
        code: 'C109',
        price: 60.00,
        isValid(){
            return false
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