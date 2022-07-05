<template>
    <h1>Hello</h1>
    <button @click="fun">Click</button>
</template>

<script>


export default ({

    methods:{
        fun(){
            this.$emit('sub')
        }
    }

})
    
</script>
