module.exports = {
    distanceBetweenDates: distanceBetweenDates,
    daysBetween: daysBetween,
    chronicDiseaseValidity: chronicDiseaseValidity,
    specialVisitPremiums: specialVisitPremiums,
}

/**
 * 
 * @param {Date} d1 
 * @param {Date} d2 
 * @returns {number} number of milliseconds between the two dates
 */
function distanceBetweenDates(d1, d2){
    return d2.getTime() - d1.getTime()

}
/**
 * Returns the number of days between two Dates
 * @param {Date} d1 
 * @param {Date} d2 
 * @return {number} days
 */

function daysBetween(d1, d2){
   return Math.abs(d2.getTime() - d1.getTime()) / 86400000
}

/**
 * 
 * @param {String} code 
 * @returns boolean compatability with E078
 */
function chronicDiseaseValidity(code){
    return (code == 'C340' || code == 'C341' || code == 'C343')
}
/**
 * Determines special visit premiums
 * @param {String} code 
 * @param {Object} apt 
 * @returns {String} Updated code with premium suffix
 */
function specialVisitPremiums(code, apt){
    
    // EMERG – K; INPATIENT – C; UNSCHEDULED - U
    // presuming all codes are valid

    switch(apt.aptType){
        case 'inpatient':
            code = 'C' + code
            break
        case 'unscheduled':
            code = 'U' + code
            break
        case 'ed' :
            code = 'K' + code
            break
        case 'regular':
            code = 'A' + code
            break

    }


    return code
}