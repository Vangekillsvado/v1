<template>
<table class="center">
    <tr><th><p>Patient ID number:</p></th>
    <th><input ref="id" name="id" type="number"></th>
    </tr>
    <tr><th><p>Patient name:</p></th>
    <th><input ref="name" name="name" type="text"></th>
    </tr>
    <tr><th><p>Date of Birth: </p></th>
    <th><input ref="birthday" name="birthday" type="date"></th>
    </tr>
    <tr><th><p>Chronic Disease:</p></th>
    <th>
        <select v-model="diseaseAssessment">
            <option value="Diabetes">Diabetes</option>
            <option value="Cancer">Cancer</option>
            <option value="Schizophrenia">Schizophrenia</option>
            <option value="">None</option>
        </select></th>
    </tr>
    <tr><button @click="handleClick" >Submit</button></tr>
   

</table>

</template>
<script>
export default {

  data(){
    return{
      diseaseAssessment:'',
    }
  },
  
  methods: {
    handleClick(){
       
        this.$emit('submitPatient', {
            name: this.$refs.name.value,
            id: this.$refs.id.value,
            birthday: new Date(this.$refs.birthday.value), 
            chronicDisease: this.diseaseAssessment
        })


    }


  }
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


</style>
