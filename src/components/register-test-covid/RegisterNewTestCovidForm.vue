<template>
  <div>
    <b-row class="mt-2">
      <b-col md="6">
        <b-form-group>
          <label class="form-title">Fecha de registro</label>
          <b-form-datepicker
            v-model="registerDate"
            size="sm"
            class="rounded-0"
            placeholder=""
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="es"
            disabled
          >
            <template #button-content>
              <b-icon-calendar2-plus scale="0.8" />
            </template>
          </b-form-datepicker>
        </b-form-group>
        <b-form-group class="mt-3">
          <label class="form-title">Tipo de test</label>
          <b-form-select
            v-model="testType"
            size="sm"
            :options="testTypeOptions"
          />
        </b-form-group>
        <b-form-group>
          <label class="form-title">Fecha de test</label>
          <b-form-datepicker
            v-model="testDate"
            size="sm"
            class="rounded-0"
            placeholder=""
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="es"
          >
            <template #button-content>
              <b-icon-calendar2-plus scale="0.8" />
            </template>
          </b-form-datepicker>
        </b-form-group>
        <b-form-group>
          <label class="form-title">Imagen del Test</label>
          <b-form-file
            v-model="image"
            :state="Boolean(image)"
            placeholder="Seleccione una imagen del test..."
            drop-placeholder="Drop file here..."
            browse-text="Seleccionar"
            
          ></b-form-file>
          <div class="mt-3">
            Archivo Seleccionado: {{ image ? image.name : "" }}
          </div>
          <b-img
            v-if="hasImage"
            :src="imageSrc"
            class="mb-3"
            fluid
            block
            rounded
          ></b-img>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group>
          <label class="form-title" label-for="name-input">Cédula</label>
          <b-form-input
            id="name-input"
            v-model="cedula"
            size="sm"
            class="rounded-0"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mt-3">
          <label class="form-title" label-for="name-input"
            >Marca del test</label
          >
          <b-form-input
            id="name-input"
            v-model="testBrand"
            size="sm"
            class="rounded-0"
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mt-3">
          <label class="form-title">Resultado</label>
          <b-form-select
            size="sm"
            v-model="testResult"
            :options="testResultOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col class="text-right mr-4">
        <b-overlay
          :show="sending"
          rounded
          opacity="0.7"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
        >
          <b-button class="main-btn" @click="save" :disabled="!canSave"
            >Guardar</b-button
          >
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { RepositoryFactory } from "@/services/api";
import { mapGetters } from "vuex";
const base64Encode = (data) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default {
  name: "register-new-test-covid-form",
  data() {
    return {
      sending: false,

      registerDate: "",
      testType: "",
      testDate: "",
      cedula: "",
      testBrand: "",
      testResult: "",

      testTypeOptions: [
        { value: "PCR", text: "PCR" },
        { value: "Antígenos", text: "Antígenos" },
      ],
      testResultOptions: [
        { value: "Positivo", text: "Positivo" },
        { value: "Negativo", text: "Negativo" },
      ],
      image: null,
      imageSrc: null,
    };
  },
  mounted() {
    let user = this.oidcUser;
    this.cedula = user["cedula"] ?? user["passport"];
    this.registerDate = new Date();
  },
  computed: {
    ...mapGetters("oidcStore", ["oidcUser"]),
    ...mapGetters("variables", ["getPharmacyId"]),
    canSave() {
      return (
        this.registerDate !== "" &&
        this.testType !== "" &&
        this.testDate !== "" &&
        this.cedula !== "" &&
        this.testBrand !== "" &&
        this.testResult !== ""
      );
    },
    hasImage() {
      return !!this.image;
    },
  },
  watch: {
    image(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then((value) => {
              this.imageSrc = value;
            })
            .catch(() => {
              this.imageSrc = null;
            });
        } else {
          this.imageSrc = null;
        }
      }
    },
  },
  methods: {
    async save() {
      this.sending = true;
      console.log(this.image);
      try {
        let user = this.oidcUser;
        let payload = new FormData();
        payload.append(
          "json",
          JSON.stringify({
            Idusuario: user["unique_id"],
            Fecharegistro: this.registerDate,
            Tipotest: this.testType,
            Cedula: this.cedula,
            Marcatest: this.testBrand,
            Resultado: this.testResult,
            Idfarmacia: this.getPharmacyId == "" ? 0 : this.getPharmacyId,
          })
        );
        payload.append("Imagen", this.image);

        await RepositoryFactory.testCovid.add(payload);
        this.clearFields();
        this.$emit("created");
      } catch (error) {
        window.console.log(error);
      }
      this.sending = false;
    },
    clearFields() {
      //this.registerDate = "";
      this.testType = "";
      this.testDate = "";
      //this.cedula = "";
      this.testBrand = "";
      this.testResult = "";
      this.imageSrc= null;
      this.image=null;
    },
  },
};
</script>