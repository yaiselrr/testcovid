<template>
    <b-row class="justify-content-center mt-5">
        <div class="text-center">
            <b-spinner variant="primary"></b-spinner>
        </div>
        <div class="text-center">
            <p>Se esta cerrando la sesión de usuario</p>
        </div></b-row
    >
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "logout",
    methods: {
        ...mapActions("oidcStore", ["authenticateOidc", "signOutOidc"]),
    },
    mounted(){
        this.signOutOidc();
    }
};
</script>