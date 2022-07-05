module.exports = {
    distanceBetweenDates: distanceBetweenDates,
}
function distanceBetweenDates(d1, d2){
    console.log(d1, d2, "I'm Pickl Ricke")
    return d2.getTime() - d1.getTime()

}