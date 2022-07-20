<template>
 
  <h1>Verus</h1>

  <h5>

    Switch Views <br>
    <div class="buttons">
    <button @click="switchMode(1)">New Patient</button>
    <button @click="switchMode(2)">New Appointment</button>
    </div>
  </h5>


  <!-- components for new patient/newappt -->
  <CreatePatients v-if="this.mode==1" msg="AHHHHH" @submitPatient="submitPatient"/>
  <CreateAppointments v-if="this.mode==2" @submitAppointment="verifyId"/> <!--  -->
  


  
  <!-- Check to see whether they're creating a new patient or appointment™ -->

  <ul v-if="this.mode==1"> <!-- patient mode -->
    <li v-for="p in patients" v-bind:key="p">
        <p>{{ p.name }} - {{ p.id }} - {{ p.birthday.toDateString() }}</p>
    </li>
  </ul>

  <ul v-if="this.mode==2"> <!-- appointment mode -->
    <li  v-for="a in appointments" v-bind:key="a"> <!-- gotta inject some sorta for loop into here to display multiple codes -->
        <p>{{ a.id }} - {{ a.date.toDateString() }} - {{a.diagnosis}} - {{ displayCodes(a.code) }} - {{ a.patientType}} - {{ a.refStatus }}</p>
    </li>
  </ul>
</template>

<script>
import CreatePatients from './components/CreatePatients.vue'
import CreateAppointments from './components/CreateAppointments.vue'
import {billing} from './logic/Billing'
export default {
  name: 'App', //this just needs to be here for Vue to work
  components: {
    CreatePatients, //Have to list all components
    CreateAppointments, 
},
  data(){
    return{
   patients: [
    /**
     * This is where a hookup would need to happen, or could happen.
     * Right now I have all the patients stored here, but we could remove this
     * and just do calls to the backend later once the cr number is specified. 
     * So probably ignore this. 
     */
        {
            name: "Adam Clarke", //this is hard coded patient data
            id: 1234,
            birthday: new Date(2003, 1, 5) 
        },
        {
            name: "Summer Clarke",
            id: 2382,
            birthday: new Date(2005, 5, 27) 
        },
        {
            name: "Steven Clarke",
            id: 2112,
            birthday: new Date(1968,1,30)
        },
        {
            name: "Melanie Clarke",
            id: 1152,
            birthday: new Date(1972,8,15)
        },
        {
            name: "George Kris",
            id: 1010,
            birthday: new Date(1930,5,5)
        },
        {
            name: 'Alex',
            id: 1999,
            birthday: new Date(2005, 3, 5),
            chronicDisease: 'Schizophrenia'
        },
      ],
      appointments: [{ //this will also be replaced by later calls to backend when cr is specified
        id: 1152, 
        date: new Date(2020, 3, 20), //loaded with sample data,
        diagnosis: "Sleep Apnea",
        code: ['C345'],
        patientType: "Regular",
      },
      {
        id: 1010,
        date: new Date(2021,2,5),
        diagnosis: "Diabetes",
        code: ['A345'],
        patientType: "Regular",
      },
      {
        id: 1010,
        date: new Date(2021,3,5),
        diagnosis: "Cancer",
        code: ['C345'],
        patientType: "Regular",
      },
     
      ],
      mode: 2, //setting the mode to appointments by default and not patient registration

    }
  },
  methods: {
   /**
    * @param {number}
    */
    switchMode(mode){
      // 0 is welcome, 1 is new pat, 2 is new apt
      this.mode = mode
    },
    verifyId(apt){
        /**
         * this would likely be modified a lot. We are checking to see if
         * the patient exists in the database, so this could be a call to the backend
         * and check to see if there is a patient there with the cr number
         * given by apt.id, we then set this patient data equal to an object called
         * patient
         */
        let patient = this.patients.filter((p) => p.id == apt.id)[0]
        if (!patient) { alert("Patient not found, double check CR number.") 
        return
        }
      
        //we need to do the code before we push it to the appointment list

        //this is where all the magic happens
        /**
         * apt is the data input by the user in the form, no need for backend call
         * patient was determined from above
         * this.appointments is all the appointments. If you filter by
         * cr number, we don't have to check for that later and I can remove all the checks. 
         * We can also get the appointments in the billing function, but here should work too. 
         * this.appointments is replaced with a call to the backend
         */
        let code = billing(apt, this.appointments, patient) 

        //so after we get the appointment, we push it to the list of appointments. 
        //this would basically be just adding another appointment to the database
        this.appointments.push({
            id: apt.id,
            date: apt.date,
            diagnosis: apt.diagnosis,
            code: code,
        }
        )
 
      
  },
  /**
   * @param {Array} code
   * @return {String} pretty codes
   */
    displayCodes(codes){
        let val = ""
        for (let i = 0 ; i < codes.length ; i++){
            val += codes[i] + ', '
        }
        return val
    },
    //this is adding a patient to the data base
    submitPatient(pat){ this.patients.push(pat)},
}, //methods closing bracket
}
</script>

<style>
.buttons{
  padding:5px;
  margin: 5px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>