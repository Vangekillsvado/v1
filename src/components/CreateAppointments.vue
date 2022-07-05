<template>
  
    <table class="center">
        <tr><th><p>Patient ID number:</p></th>
    <th><input value="1010" ref="id" name="id" type="number"></th></tr>

        <tr><th><p>Date of Appointment: </p></th>
    <th><input ref="appointmentDate" name="appointmentDate" type="date"></th>
    </tr>

     <tr><th><p>Diagnosis: </p></th>
    <th><input value="Tired" ref="diagnosis" name="diagnosis" type="text"></th>
    </tr>

    <tr><th><p>Appointment Type :  </p></th>
    <th>
        <select v-model="formType" name="appointmentType" id="appointmentType" ref="appointmentType">
            <option value="Consultation">Consultation</option>
            <option value="Follow Up">Follow Up</option>
        </select>
  </th>
    </tr>



    <!-- <div v-if="formType == 'Consultation'"> -->
    <!-- <table class="center"> -->
            <tr v-if="formType == 'Consultation'"><th><p>Patient is : </p></th>
            <th>
                <select  name="patientType" id="patientType" ref="patientType">
                    <option value="regular">Regular</option>
                    <option value="inpatient">Inpatient</option>
                    <option value="ed">ED Patient</option>
                </select>
        </th>
            </tr>

            <tr v-if="formType == 'Consultation'"><th><p>Has patient had referall and care? </p></th>
            <th>
            <select value="No" name="referall" id="referall" ref="referall">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        </th>
            </tr>


            <tr v-if="formType =='Follow Up'"><th><p>Assessed for hospital admission :</p></th> 
            <th><input type="checkbox" ref="admissionAssessed"></th>
            </tr>
            <!-- </table> -->
    <!-- </div> -->
            


     <!-- <tr><th><p>Category: </p></th>
    <th><input value="Consultation" ref="category" name="category" type="text"></th>
    </tr> -->



    <button @click="submitApt">Submit Appointment</button>
    <button @click="test">Click</button>


    </table>
</template>

<script>

    
export default {

    name: 'CreateAppointments',
    data(){
        return{
            formType:'',
        }
    },
    methods: {
        submitApt(){
            
           let date=new Date(this.$refs.appointmentDate.value)

            //if no date is put in, put in this
            //FOR TESTING PURPOSES ONLY
            if(!new Date(this.$refs.appointmentDate.value).getTime()) date = new Date(2022,5,30)
            


            let appointment = undefined
            //utilize obj.assign to remove some redundancy 

            //create different objects grabbing different properties based on appointment type
            // if referall status is only relevant to consultations, we don't ask, therefore don't have it in follow ups
            // and this is just dead memory / a great way to end up reading from indefined 
            if(this.formType == 'Consultation'){

            appointment = {

                id: this.$refs.id.value,
                date: date,//new Date(this.$refs.appointmentDate.value),//new Date(2022,3,20), //automated for testing
                diagnosis: this.$refs.diagnosis.value,
                patientType: this.$refs.patientType.value,
                refStatus: this.$refs.referall.value,
                aptType: this.$refs.appointmentType.value,

            }
            }
            else if(this.formType == 'Follow Up'){
                appointment = {
                    id: this.$refs.id.value,
                    date: date,//new Date(this.$refs.appointmentDate.value),//new Date(2022,3,20), //automated for testing
                    diagnosis: this.$refs.diagnosis.value,
                    assessedAdmission: this.$refs.admissionAssessed,
                    aptType: this.$refs.appointmentType.value,
                }
            }
            else if (!this.$refs.admissionAssessed) { //no appointment type is selected
                alert('In order to bill a code, you must select an appointment type.')
                return
            }


                this.$emit('submitAppointment', appointment)
            }

        },
        test(){
           // alert(this.this.$refs.assessedAdmission.value)
        },

    }




</script>

<style>

p{
    color: purple;
}
.center{
    margin: auto;
    width: 50%;
    padding: 10px;
    }


form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label{
    color: #aaa;
    display: inline-block;
    margin: 25px o 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    font-weight: bold;
}
input, select{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
input[type="checkbox"]{
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}
.pill{
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}
button {
    background: rgb(15, 61, 211);
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;

}
.submit{
    text-align: center;
}
.error{
    color: red;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}

</style>
