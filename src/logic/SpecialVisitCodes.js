let specialVisitPremiumCodes = [ //might possible want to add tags, as there are factors like travelling that
//I think are mutually exclusive
    {
        name: 'Travel Premium for 17:00-24:00 Monday - Friday',
        code: 'C102',
        price: 36.40,
        isValid({apt}){  // eslint-disable-next-line
            let hours = apt.endTime.substring(0,2)
            console.log(apt.date.getDay())
        }
    },
    {
        name: 'Travel Premium for 07:00-24:00 Sat, Sun, & Holidays',
        code: 'C103',
        price: 36.40,
        isValid(){
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