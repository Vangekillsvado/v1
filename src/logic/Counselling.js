
export function counselling (apt, appointments){

    //for now, with the one code, we're doing it this way
    if(K013(apt,appointments)) return 'K013' 
    else return 'Null Code'
}

/**
 * 
 * @param {*} apt 
 * @param {*} appointments 
 * @return {boolean} validity of K013   
 */
function K013 (apt, appointments){
    //K013 (q30 minutes) – limit 3/ year:  CANNOT BE USED WITH ANY OTHER CODE
    return(appointments.filter( (a) => {return(a.code == 'K013')}).length <= 2) //again the 2 is because we can't bill if there is 3
}