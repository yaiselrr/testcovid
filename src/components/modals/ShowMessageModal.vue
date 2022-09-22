<template>
    <div>
        <b-modal
            id="show-message"
            v-model="isOpen"
            content-class="rounded-0"
            dialog-class="long-modal"
            header-class="border-0"
            header-bg-variant="light"
            :title="getModalTitle"
            hide-header-close
            centered
            no-close-on-backdrop
            hide-footer
        >
            <div class="text-center">
                <p class="form-title mt-2">
                    {{ getModalMessage }}
                </p>
                <p v-if="getModalSubMessage" class="form-title">
                    {{ getModalSubMessage }}
                </p>
            </div>
            <b-row class="m-3 text-end">
                <b-col>
                    <b-button
                        size="sm"
                        class="main-btn px-3 ms-4"
                        @click="close"
                        >Aceptar</b-button
                    >
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "show-message-modal",
    computed: {
        ...mapGetters("modals", [
            "isOpen",
            "getModalTitle",
            "getModalMessage",
            "getModalSubMessage",
            "getRouteName",
        ]),
    },
    methods: {
        ...mapActions("modals", ["closeModal", "resetModal"]),
        close() {
            let route = this.getRouteName;
            this.closeModal();
            this.resetModal();
            if (route !== "") {
                if (route === "panama-digital") {
                    window.location.href = "https://www.panamadigital.gob.pa/";
                } else {
                    this.$router.push({
                        name: route,
                    });
                }
            }
        },
    },
};
</script>