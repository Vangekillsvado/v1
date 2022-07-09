<template>
 
  <h1>Verus</h1>

  <h5>

    Switch Views <br>
    <div class="buttons">
    <button @click="switchMode(1)">New Patient</button>
    <button @click="switchMode(2)">New Appointment</button>
    </div>
    
  
  </h5>
  <InputFields v-if="this.mode==1" msg="AHHHHH" @submitPatient="submitPatient"/>
  <CreateAppointments v-if="this.mode==2" @submitAppointment="verifyId"/> <!--  -->
  


  
  <!-- Check to see whether they're creating a new patient or appointment™ -->

  <ul v-if="this.mode==1"> <!-- patient mode -->
    <li v-for="p in patients" v-bind:key="p">
        <p>{{ p.name }} - {{ p.id }} - {{ p.birthday.toDateString() }}</p>
    </li>
  </ul>

  <ul v-if="this.mode==2"> <!-- appointment mode -->
    <li  v-for="a in appointments" v-bind:key="a"> <!-- gotta inject some sorta for loop into here to display multiple codes -->
        <p>{{ a.id }} - {{ a.date.toDateString() }} - {{a.diagnosis}} - {{ a.code }} - {{ a.patientType}} - {{ a.refStatus }}</p>
    </li>
  </ul>
</template>

<script>


import InputFields from './components/InputFields.vue'
import CreateAppointments from './components/CreateAppointments.vue'

import {billing} from './logic/Billing'


export default {
  name: 'App',
  components: {
    InputFields,
    CreateAppointments, 

},
  data(){
    return{
   patients: [
        {
          name: "Adam Clarke",
          id: 1234,
          birthday: new Date(2003, 1, 5) //loaded with sample data

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
      appointments: [{
        id: 1152,
        date: new Date(2020, 3, 20), //loaded with sample data,
        diagnosis: "Sleep Apnea",
        code: "A345",
        patientType: "Regular",
      },
      {
        id: 1010,
        date: new Date(2021,2,5),
        diagnosis: "Diabetes",
        code: "C345",
        patientType: "Regular",
      },
      {
        id: 1010,
        date: new Date(2021,3,5),
        diagnosis: "Cancer",
        code: "C345",
        patientType: "Regular",
      },
     
      ],
      datum: "egg",
      mode: 2,
      patApt:[], //
    }
  },
  methods: {
   


    switchMode(mode){
      // 0 is welcome, 1 is new pat, 2 is new apt
      this.mode = mode
     // console.log(mode)
    },
    help(){
      console.log(typeof this.patients)
    },
    verifyId(apt){

      //check list of patients to see if ID is in there
      let patient = this.patients.filter((p) => p.id == apt.id)[0]
      if (!patient) { alert("Patient not found, double check CR number.") 
      return
      }
      
    //we need to do the code before we push it to the appointment list
    
      //based on the appointment type, we change which codes we test for
      let code = billing(apt, this.appointments, patient)


      this.appointments.push({
        id: apt.id,
        date: apt.date,
        diagnosis: apt.diagnosis,
        code: code,
      },
      
      )
 
      
  },
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
