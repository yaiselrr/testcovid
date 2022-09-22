<template>
  <div class="mt-3">
    <h4 class="page-title pb-2 mt-3 text-uppercase">
      Registro test covid para farmacias
    </h4>
    <b-row>
      <b-col>
        <h6 class="text-uppercase">Añadir nuevo test covid</h6>
        <div class="mt-3">
          <RegisterNewTestCovidForm @created="refreshTable" />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5">
        <h6 class="text-uppercase">Registro de test realizados</h6>
        <div class="mt-3">
          <TestCovidTable ref="testCovidTable" :pharmacyId="pharmacyId"/>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TestCovidTable from "./TestCovidTable.vue";
import RegisterNewTestCovidForm from "./RegisterNewTestCovidForm.vue";

export default {
  name: "register-test-covid-pharmacy",
  props: {
    pharmacyId: {
      type: String
    },
  },
  components: {
    TestCovidTable,
    RegisterNewTestCovidForm,
  },
  methods: {
    refreshTable() {
      this.$refs.testCovidTable.retrieveData();
    },
  },
};
</script>