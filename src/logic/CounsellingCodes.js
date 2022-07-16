let counsellingCodes = [
    {
        name: 'Counselling',
        price: 100,
        code: 'K013',
        isValid({appointments}){
            console.log(appointments.filter( (a) => {return(a.code.toString() == 'K013')}))
            return(appointments.filter( (a) => {return(a.code.toString() == 'K013')}).length <= 2) //again the 2 is because we can't bill if there is 3
        }
    }
]



export {counsellingCodes}