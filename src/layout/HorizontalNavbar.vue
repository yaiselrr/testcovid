<template>
    <b-navbar type="dark" variant="default" class="shadow-sm navbar-custom">
        <b-navbar-brand href="/" class="ml-2">
            <b-img :src="logo" class="logo" fluid></b-img>
        </b-navbar-brand>
        <b-navbar-brand href="/" class="ml-auto">
            <b-img :src="logoNav" class="logoNav" fluid></b-img>
        </b-navbar-brand>
    </b-navbar>
</template>

<script>
export default {
    name: "nav-bar",
    data() {
        return {
            logo: undefined,
            logoNav: undefined,
        };
    },
    mounted() {
        this.logo = require("@/assets/Images/LogoPanamaDigital.png");
        this.logoNav = require("@/assets/Images/LogoAigGris.png");
    },
};
</script>

