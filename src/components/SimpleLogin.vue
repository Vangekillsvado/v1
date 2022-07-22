<template>
    <h3>Simple Login</h3>
    <button @click="signInWithGoogle">Sign In With Google</button>
    <table class="center">
        <tr>
            <th>Email Address: </th>
            <th><input v-model="emailAddress" type='text' id="text-fields"></th>
        </tr>

        <tr>
             <th>Password: </th>
            <th><input v-model="password" type='password' id="text-fields"></th>
        </tr>
    </table>
    <button @click="submit(this.emailAddress, this.password)">Submit</button>
</template>
<script>


export default ({
    data(){
        return{
            emailAddress: '',
            password:'',
        }
        
    },
    methods: {
        /**
         * Logs user in
         * @param {String} email 
         * @param {String} password 
         */
        submit(email, password){
            if(email && password){
                alert ('Your email is ' + email + " and I won't say your password!")
                console.log(email)
                console.log(password)
            }
            else
                alert("Invalid email and password!")
        },
        /**
         * Takes user to external page to sign in with google
         */
        signInWithGoogle(){
            //this will take them to the signin with google page
        },
   }
})
</script>

<style scoped>
.center{
    display: flex;
    justify-content: center;
    align-content: center;
}
#text-fields{
    border: 0.5px solid rgba(0, 0, 0, 0.8);
}
</style>
