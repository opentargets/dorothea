import Vue from 'vue'

export default {
  state: {
    drugOptions: [],
    gmOptions: [],
    tfOptions: [],
    boxPlotData: {},
    nestedBoxPlotData: {},
    simpleSamplePlotData: [],
    gmTableData: {}
  },
  mutations: {
    mUpdateDrugOptions (state, payload) {
      state.drugOptions = payload
    },
    mUpdateGMOptions (state, payload) {
      state.gmOptions = payload
    },
    mUpdateTFOptions (state, payload) {
      state.tfOptions = payload
    },
    mUpdateBoxPlotData (state, payload) {
      state.boxPlotData = payload
    },
    mUpdateNestedBoxPlotData (state, payload) {
      state.nestedBoxPlotData = payload
    },
    mUpdateSimpleSamplePlotData (state, payload) {
      state.simpleSamplePlotData = payload
    },
    mUpdateGMTableData (state, payload) {
      state.gmTableData = payload
    }
  },
  actions: {
    updateDrugOptions ({ state, commit }, params) {
      Vue.http.get('http://localhost:9009/api/drug-options', {params: params})
        .then(function (response) {
          commit('mUpdateDrugOptions', response.body)
        })
    },
    updateGMOptions ({ state, commit }, params) {
      Vue.http.get('http://localhost:9009/api/gm-options', {params: params})
        .then(function (response) {
          commit('mUpdateGMOptions', response.body)
        })
    },
    updateTFOptions ({ state, commit }, params) {
      Vue.http.get('http://localhost:9009/api/tf-options', {params: params})
        .then(function (response) {
          commit('mUpdateTFOptions', response.body)
        })
    },
    updateBoxPlotData ({state, commit}, params) {
      Vue.http.get('http://localhost:9009/api/box-plot', {params: params})
        .then(function (response) {
          commit('mUpdateBoxPlotData', response.body)
        })
    },
    updateNestedBoxPlotData ({state, commit}, params) {
      Vue.http.get('http://localhost:9009/api/nested-box-plot', {params: params})
        .then(function (response) {
          commit('mUpdateNestedBoxPlotData', response.body)
        })
    },
    updateSimpleSamplePlotData ({state, commit}, params) {
      Vue.http.get('http://localhost:9009/api/simple-sample-plot', {params: params})
        .then(function (response) {
          commit('mUpdateSimpleSamplePlotData', response.body)
        })
    },
    updateGMTableData ({state, commit}, params) {
      Vue.http.get('http://localhost:9009/api/gm-table', {params: params})
        .then(function (response) {
          commit('mUpdateGMTableData', response.body)
        })
    }
  }
}