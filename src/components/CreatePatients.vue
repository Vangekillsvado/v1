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
            <option value="042">AIDS</option>
            <option value="043">AIDs-related complex</option>
            <option value="044">Other human immunodeficiency virus infection</option>
            <option value="250">Diabetes mullitus, including complications</option>
            <option value="286">Coagulation defects (e.g. haemophilia, other factor deficiencies)</option>
            <option value="287">Purpura, thrombocytopenia, other haemorrhagic conditions</option>
            <option value="290">Senile dementia, presenile dementia</option>
            <option value="299">Child psychoses or autism</option>
            <option value="313">Behavioural disorders of childhood and adolescence</option>
            <option value="315">Specified delays in development (e.g. dyslexia, dyslalia, motor retardation)</option>
            <option value="332">Parkinson's Disease</option>
            <option value="340">Multiple Sclerosis </option>
            <option value="343">Cerebral Palsy </option>
            <option value="345">Epilepsy</option>
            <option value="402">Hypertensive Heart Disease </option>
            <option value="428">Congestive Heart Failure</option>
            <option value="491">Chronic Bronchitis </option>
            <option value="492">Emphysema</option>
            <option value="493">Asthma, Allergic Bronchitis</option>
            <option value="515">Pulmonary Fibrosis</option>
            <option value="555">Regional Enteritis, Crohn's Disease</option>
            <option value="556">Ulcerative Colitis</option>
            <option value="571">Cirrhosis of the Liver</option>
            <option value="585">Chronic Renal Failure, Uremia </option>
            <option value="710">Disseminated Lupus Erythaematosus, Generalized Scleroderma, Dermatomyositis</option>
            <option value="714">Rheumatoid Arthritis, Still's Disease</option>
            <option value="720">Ankylosing Spondylitis</option>
            <option value="721">Other seronegative spondyloarthropathies</option>
            <option value="758">Chromosomal Anomalies </option>
            <option value="765">Prematurity, lowbirthweight infant </option>
            <option value="902">Educational problems</option>

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
            chronicDisease: this.diseaseAssessment,
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
