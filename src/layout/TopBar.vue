<template>
    <b-navbar class="top-header">
        <b-navbar-nav>
            <b-link v-model="$i18n.locale">
                <span
                    v-for="(lang, i) in langs"
                    :key="`Lang${i}`"
                    :value="lang"
                    @click="switchLocale(lang)"
                    class="text-uppercase text-white"
                >
                    <span v-if="i > 0"> / </span>
                    {{ lang }}
                </span>
            </b-link>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
    name: "top-bar",
    data() {
        return { langs: ["es", "en"] };
    },
    methods: {
        switchLocale(locale) {
            if (this.$i18n.locale !== locale) {
                this.$i18n.locale = locale;
            }
        },
    },
};
</script>
