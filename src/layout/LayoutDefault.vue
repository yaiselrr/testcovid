<template>
    <div>
        <div v-if="validating">
            <ValidatingUser />
        </div>
        <div v-show="!validating">
            <top-bar></top-bar>
            <HorizontalNavbar></HorizontalNavbar>
            <b-container fluid class="pr-md-5">
                <b-row>
                    <sidebar></sidebar>
                    <b-col offset-xl="2" offset-lg="3">
                        <slot />
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <Modals />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import ValidatingUser from "./ValidatingUser.vue";
import Modals from "./Modals.vue";

import HorizontalNavbar from "./HorizontalNavbar.vue"
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

export default {
    name: "LayoutDefault",
    components: {
        HorizontalNavbar,
        TopBar,
        Sidebar,
        Modals,
        ValidatingUser,
    },
    data() {
        return {
            timer: null,
            validating: false,
        };
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    mounted() {
        console.log("test");
         this.startTimer();
    },
    computed: {
        ...mapGetters("oidcStore", ["oidcIsAuthenticated", "oidcUser"]),
        
    },
    methods: {
        async validateUser() {
            if (!this.oidcIsAuthenticated) {
                this.validating = true;
                return;
            }
            this.validating = false;

            let meta = this.$route.meta;
            if (meta.isPublic || meta.noNavbar === true) {
                this.validating = false;
                this.stopTimer();
                return;
            }
        },
        startTimer() {
            this.timer = setInterval(() => {
                this.validateUser();
            }, 1000);
        },
        stopTimer() {
            clearInterval(this.timer);
        },
    },
};
</script>

<style>
.cs-pointer {
    cursor: pointer;
}

.main-btn {
    background-color: #456b8f !important;
    border-radius: 0 !important;
}

.page-title {
    color: #456b8f;
}

.card-title-color {
    color: #406892;
}

.form-title {
    font-size: 14px;
    font-weight: 500;
    color: #717171;
    margin-left: 1rem;
    margin-bottom: 3px;
}

/*table style*/
.b-table {
    margin-bottom: 0;
}

.b-table thead {
    background-color: rgba(0, 0, 0, 0.03);
}

.b-table > tbody > tr:nth-child(odd) > td,
.b-table > tbody > tr:nth-child(odd) > th {
    background-color: #ffffff;
}

.b-table > tbody > tr:nth-child(even) > td,
.b-table > tbody > tr:nth-child(even) > th {
    background-color: rgba(0, 0, 0, 0.03);
}

.b-table > thead > tr > th {
    padding: 0.8rem 0 0.8rem 2rem;
    color: #456b8f;
    border-bottom: 2px solid #456b8f;
    font-weight: 500;
}

.b-table > tbody > tr > td {
    padding-left: 2rem;
    border: 0;
    font-size: 14px;
    font-weight: 500;
    color: #717171db;
}

.table > :not(:first-child) {
    border-top: 2px solid #456b8fa8 !important;
}

/*table pagination*/
.b-pagination .page-item.active .page-link {
    background-color: #456b8f;
    border-color: #456b8f;
}

.b-pagination li.page-item {
    margin-left: 0.5rem;
}

.b-pagination li.page-item.disabled span.page-link {
    background-color: #7171714f;
    color: #717171db;
    border-radius: 0;
    padding-left: 4px !important;
    padding-right: 4px !important;
}

.b-pagination .page-item:last-child .page-link,
.b-pagination .page-item:first-child .page-link {
    border-radius: 0 !important;
}

.pagination-sm .page-link {
    padding: 0.1rem 0.5rem !important;
    color: #456b8f;
    border: 1.5px solid #456b8f;
}

.b-pagination li.page-item button[aria-label="Go to next page"],
.b-pagination li.page-item button[aria-label="Go to last page"],
.b-pagination li.page-item button[aria-label="Go to previous page"],
.b-pagination li.page-item button[aria-label="Go to first page"] {
    padding-left: 4px !important;
    padding-right: 4px !important;
}

/*modal*/
.long-modal {
    max-width: 600px !important;
}

/*list group*/
.list-group .list-group-item {
    margin-bottom: 0.5rem;
    background-color: rgba(0, 0, 0, 0.03);
    border: 0;
    box-shadow: 0.2rem 0.2rem 0.1rem rgb(0 0 0 / 8%);
    border-radius: 0;
    cursor: pointer;
}

.list-group .list-group-item svg {
    color: #406892;
}

.actions-container {
    margin-bottom: 1.5rem !important;
}

/* details*/
.details-title {
    font-size: 15px;
    font-weight: 500;
    color: #717171;
}

.details-title-value {
    color: #406892;
    font-weight: 500;
    font-size: 15px;
}

@media (max-width: 475px) {
    .actions-container {
        text-align: end;
    }
}

/*file-input*/
.file-input input {
    display: none;
}

.file-input label {
    font-size: 15px;
}

.file-name {
    font-size: 14px;
    font-weight: 500;
    color: #717171;
}

.b-form-datepicker button {
    border-right: 1px solid #406892 !important;
    border-radius: 0;
}
</style>
