<template>
    <h1>Admin Page</h1>
</template>

<script>
export default {
    computed:{
        userIP(){
            fetch('https://api.ipify.org/?format=json').then(res => res.json()).then(data => data.ip)
        }
    }
}
</script>