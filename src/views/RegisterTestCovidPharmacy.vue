<template>
    <div>
        <RegisterTestCovidPharmacy :pharmacyId="pharmacyId" />
    </div>
</template>

<script>
import RegisterTestCovidPharmacy from "@/components/register-test-covid/RegisterTestCovidPharmacy.vue";
import { mapActions } from 'vuex';
export default {
    name: "register-test-covid-pharmacy-view",
    props: {
    pharmacyId:{
    type:String,
    default:"1"
  }},
    components: {
        RegisterTestCovidPharmacy,
    },
     mounted(){
   this.setPharmacyId(this.pharmacyId)
 },
 methods:{
   ...mapActions('variables',['setPharmacyId']),
 }
};
</script>