<template>
  <div>
    <!-- <b-row class="justify-content-end mb-3">
            <b-col xl="3" md="6">
                <b-input-group class="mt-1">
                    <b-form-input
                        placeholder="Buscar"
                        class="rounded-0"
                        size="sm"
                        v-model="search"
                        @keydown.enter="filterTable"
                    ></b-form-input>
                    <b-input-group-append>
                        <b-button
                            class="main-btn"
                            size="sm"
                            @click="filterTable"
                        >
                            <b-icon-search></b-icon-search>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row> -->
    <b-row>
      <b-col>
        <b-card no-header no-body class="rounded-0 shadow-sm border-0">
          <b-table
            stacked="md"
            small
            hover
            select-mode="single"
            selectable
            show-empty
            empty-text="No hay registros que mostrar"
            :busy.sync="isBusy"
            :fields="fields"
            :items="items"
            :current-page="currentPage"
            :per-page="take"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import { RepositoryFactory } from "@/services/api";
import { mapGetters } from "vuex";

export default {
  name: "test-covid-table",
  props: {
    pharmacyId: {
      type: String,
    },
  },
  data() {
    return {
      items: [],
      fields: [
        { key: "tipotest", label: "Tipo de test" },
        { key: "fecharegistro", label: "Fecha de registro" },
        { key: "marcatest", label: "Marca del test" },
        { key: "cedula", label: "Cédula" },
        { key: "resultado", label: "Resultado" },
      ],
      isBusy: false,
      currentPage: 1,
      take: 10,
      rows: 1,
    };
  },
  computed: {
    ...mapGetters("oidcStore", ["oidcUser"]),
  },
  async mounted() {
    await this.retrieveData();
  },
  methods: {
    async retrieveData() {
      
      this.isBusy = true;
      try {
        let user = this.oidcUser;
        var idUsuario = user["unique_id"];
        let response = "";
        var pharmacy = this.pharmacyId;

        if (this.pharmacyId == undefined) {
          response = await RepositoryFactory.testCovid.getAll({
            idUsuario,
          });
        } else {
          response = await RepositoryFactory.testCovid.getAllByPharmacy({
            idfarmacia:pharmacy,}
          );
        }

        let items = response.data;
        items = this.formatData(items);
        this.items = items;
      } catch (error) {
        window.console.log(error);
      }
      this.isBusy = false;
    },
    formatData(items) {
      for (const item of items) {
        item.resultado = item.resultado.toUpperCase();
        item.fecharegistro = this.parseDate(item.fecharegistro);
      }
      return items;
    },
    parseDate(date) {
      return moment.utc(date).format("DD/MM/YYYY");
    },
    parseAndConvertDate(date) {
      return moment.utc(date).local().format("DD/MM/YYYY HH:mm:ss");
    },
  },
};
</script>