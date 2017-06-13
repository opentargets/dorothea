<template>
  <dorothea-base-card :title="'Filter'"
                      :description="'Filter the interactions to view'">

    <div slot="card-internals" class="card-content bg-white">

      <small>
        You can filter by selecting a drug, GM, TF and CT.
      </small>

      <div class="row justify-center items-center item">
        <small class="width-1of3">Drug:</small>
        <div class="width-2of3">
          <q-select v-if="!drugId" type="list" @input="selectDrug" v-model="drugIdModel" :options="drugOptions"></q-select>
          <small class="token" v-else>{{ drugId }}<i class="cursor-pointer" @click="deselectDrug()">close</i></small>
        </div>
      </div>

      <div class="row justify-center items-center item">
        <small class="width-1of3">GM:</small>
        <div class="width-2of3">
          <q-select v-if="!gmId" type="list" @input="selectGM" v-model="gmIdModel" :options="gmOptions"></q-select>
          <small class="token" v-else>{{ gmId }}<i class="cursor-pointer" @click="deselectGM()">close</i></small>
        </div>
      </div>

      <div v-if="drugId && gmId" class="row justify-center items-center item">
        <small class="width-1of3">TF:</small>
        <div class="width-2of3">
          <q-select v-if="!tfId" type="list" @input="selectTF" v-model="tfIdModel" :options="tfOptions"></q-select>
          <small class="token" v-else>{{ tfId }}<i class="cursor-pointer" @click="deselectTF()">close</i></small>
        </div>
      </div>

    </div>

  </dorothea-base-card>
</template>

<script>
import store from '../../store'
import router from '../../router'
export default {
  data () {
    return {
      drugIdModel: null, // note this is not used, merely prevents vue errors
      gmIdModel: null, // note this is not used, merely prevents vue errors
      tfIdModel: null // note this is not used, merely prevents vue errors

    }
  },
  computed: {
    dataLoaded () {
      return store.state.data.loaded
    },
    drugId () {
      return +store.state.route.query.filterOnDrug
    },
    gmId () {
      return store.state.route.query.filterOnGM
    },
    ctId () {
      return store.state.route.query.filterOnCT
    },
    tfId () {
      return store.state.route.query.filterOnTF
    },
    drugOptions () {
      return store.state.flow2.drugOptions
    },
    gmOptions () {
      return store.state.flow2.gmOptions
    },
    tfOptions () {
      return store.state.flow2.tfOptions
    }
  },
  watch: {
    drugId: function () {
      this.updateGMOptions()
      this.updateTFOptions()
    },
    gmId: function () {
      this.updateDrugOptions()
      this.updateTFOptions()
    },
    dataLoaded: function () {
      this.updateDrugOptions()
      this.updateGMOptions()
      this.updateTFOptions()
    }
  },
  methods: {
    selectDrug (drugId) {
      let query = {
        filterOnDrug: drugId
      }
      if (this.gmId) query.filterOnGM = this.gmId
      router.push({
        path: '/investigation/2',
        query
      })
    },
    deselectDrug () {
      let query = {}
      if (this.gmId) query.filterOnGM = this.gmId
      router.push({
        path: '/investigation/2',
        query
      })
    },
    selectGM (gmId) {
      let query = {
        filterOnGM: gmId
      }
      if (this.drugId) query.filterOnDrug = this.drugId
      router.push({
        path: '/investigation/2',
        query
      })
    },
    deselectGM () {
      let query = {}
      if (this.drugId) query.filterOnDrug = this.drugId
      router.push({
        path: '/investigation/2',
        query
      })
    },
    selectTF (tfId) {
      let query = {
        filterOnTF: tfId
      }
      if (this.drugId) query.filterOnDrug = this.drugId
      if (this.gmId) query.filterOnGM = this.gmId
      router.push({
        path: '/investigation/2',
        query
      })
    },
    deselectTF () {
      let query = {}
      if (this.drugId) query.filterOnDrug = this.drugId
      if (this.gmId) query.filterOnGM = this.gmId
      router.push({
        path: '/investigation/2',
        query
      })
    },
    updateDrugOptions () {
      store.dispatch('updateDrugOptions', {
        gmId: this.gmId,
        ctId: this.ctId
      })
    },
    updateGMOptions () {
      store.dispatch('updateGMOptions', {
        drugId: this.drugId,
        ctId: this.ctId
      })
    },
    updateTFOptions () {
      store.dispatch('updateTFOptions', {
        drugId: this.drugId,
        gmId: this.gmId,
        ctId: this.ctId
      })
    }
  }
}
</script>