<template>
    <b-sidebar
        id="sidebar-nav"
        title="Sidebar"
        bg-variant="dark"
        text-variant="light"
        no-close-on-route-change
        no-header
        :backdrop-variant="'transparent'"
        backdrop
        shadow
    >
        <div class="pl-2 py-4">
            <b-nav vertical class="w-100">
                <b-nav-item :to="{ name: 'user' }">
                    <b-icon-person class="mr-2"></b-icon-person> Usuario
                </b-nav-item>
                <b-nav-item class="mt-2" :to="{ name: 'user-profile' }">
                    <b-icon-card-text class="mr-2"></b-icon-card-text> Perfil de
                    usuario
                </b-nav-item>
                <b-nav-item class="mt-2" :to="{ name: 'vaccination' }">
                    <b-icon-check-all class="mr-2"></b-icon-check-all> Vacunación
                </b-nav-item>
                <b-nav-item class="mt-2" :to="{ name: 'register-test-covid' }">
                    <b-icon-bag-plus class="mr-2"></b-icon-bag-plus> Registro
                    Test Covid
                </b-nav-item>
            </b-nav>
        </div>
        <template #footer>
            <b-navbar-nav class="text-center">
                <b-nav-item-dropdown right v-if="oidcIsAuthenticated">
                    <template #button-content>
                        <div class="dropdown-divider"></div>
                        {{ oidcUser.given_name }}
                        <b-icon-person-circle
                            class="ml-2"
                        ></b-icon-person-circle>
                    </template>
                    <b-dropdown-item @click="signOut"
                        >Salir <b-icon-door-open class="ml-2"></b-icon-door-open
                    ></b-dropdown-item>
                </b-nav-item-dropdown>
                <div v-else>
                    <div class="dropdown-divider"></div>
                    <b-button
                        size="sm"
                        class="rounded-0 mb-2"
                        @click="authenticateOidc"
                        >Ingresar</b-button
                    >
                </div>
            </b-navbar-nav>
        </template>
    </b-sidebar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "sidebar",
    computed: {
        ...mapGetters("oidcStore", ["oidcUser", "oidcIsAuthenticated"]),
    },
    methods: {
        ...mapActions("oidcStore", ["signOutOidc", "authenticateOidc"]),
        signOut() {
            localStorage.clear();
            this.signOutOidc();
        },
    },
};
</script>