import Vue from 'vue'
import router from '../../router'
const apiBase = 'http://localhost:9009/api/'

function updateRoute (query) {
  return new Promise((resolve, reject) => {
    router.push({
      path: '/investigation/2',
      query
    })
    resolve()
  })
}

export default {
  namespaced: true,
  state: {
    drugOptions: [],
    drugAutocompleteOptions: [],
    gmAutocompleteOptions: [],
    ctAutocompleteOptions: [],
    tfAutocompleteOptions: [],
    gmOptions: [],
    ctOptions: [],
    tfOptions: [],
    // boxPlotData: {},
    // nestedBoxPlotData: {},
    // simpleSamplePlotData: [],
    effectPlotData: [],
    gmTableData: {},
    drugTableData: {},
    tfsBarPlotData: [],
    tripletsBarPlotData: []
  },
  getters: {
    // data module (ideally server-side)
    dataLoaded: (state, getters, rootState) => rootState.data.loaded,

    // route module (synced to url)
    drugId: (state, getters, rootState) => rootState.route.query.filterOnDrug,
    gmId: (state, getters, rootState) => rootState.route.query.filterOnGM,
    ctId: (state, getters, rootState) => rootState.route.query.filterOnCT,
    tfId: (state, getters, rootState) => rootState.route.query.filterOnTF,

    // local
    drugOptions: (state) => () => state.drugOptions,
    drugAutocompleteOptions: (state) => () => state.drugAutocompleteOptions,
    gmAutocompleteOptions: (state) => () => state.gmAutocompleteOptions,
    ctAutocompleteOptions: (state) => () => state.ctAutocompleteOptions,
    tfAutocompleteOptions: (state) => () => state.tfAutocompleteOptions,
    gmOptions: (state) => () => state.gmOptions,
    ctOptions: (state) => () => state.ctOptions,
    tfOptions: (state) => () => state.tfOptions,
    // boxPlotData: (state) => () => state.boxPlotData,
    // nestedBoxPlotData: (state) => () => state.nestedBoxPlotData,
    // simpleSamplePlotData: (state) => () => state.simpleSamplePlotData,
    effectPlotData: (state) => state.effectPlotData,
    tfsBarPlotData: (state) => state.tfsBarPlotData,
    tripletsBarPlotData: (state) => state.tripletsBarPlotData,
    gmTableData: (state) => state.gmTableData,
    drugTableData: (state) => () => state.drugTableData,
    drugName: (state, getters, rootState) => {
      const drugId = +rootState.route.query.filterOnDrug
      let drugName = ''
      if (drugId) {
        state.drugOptions.map(d => {
          if (d.value === drugId) {
            drugName = d.label
          }
        })
      }
      return drugName
    },
    gmName: (state, getters, rootState) => {
      const gmId = rootState.route.query.filterOnGM
      let gmName = ''
      if (gmId) {
        state.gmOptions.map(d => {
          if (d.value === gmId) {
            gmName = d.label
          }
        })
      }
      return gmName
    },
    interaction: (state, getters, rootState, rootGetters) => {
      const drugId = +rootState.route.query.filterOnDrug
      const gmId = rootState.route.query.filterOnGM
      const ctId = rootState.route.query.filterOnCT
      const tfId = rootState.route.query.filterOnTF

      // TODO: Use an api call
      const rows = rootGetters.flow2TableData(drugId, gmId, ctId, tfId)
      // TODO: assert there is ONLY one
      if (rows.length === 1) {
        return rows[0]
      }
      else if (rows.length === 0) {
        return {}
      }
      else {
        console.log('WARNING: more than one interaction')
        return {}
      }
    }
  },
  mutations: {
    mUpdateDrugOptions (state, payload) {
      state.drugOptions = payload
    },
    mUpdateDrugAutocompleteOptions (state, payload) {
      state.drugAutocompleteOptions = payload
    },
    mUpdateGMAutocompleteOptions (state, payload) {
      state.gmAutocompleteOptions = payload
    },
    mUpdateCTAutocompleteOptions (state, payload) {
      state.ctAutocompleteOptions = payload
    },
    mUpdateTFAutocompleteOptions (state, payload) {
      state.tfAutocompleteOptions = payload
    },
    mUpdateGMOptions (state, payload) {
      state.gmOptions = payload
    },
    mUpdateCTOptions (state, payload) {
      state.ctOptions = payload
    },
    mUpdateTFOptions (state, payload) {
      state.tfOptions = payload
    },
    // mUpdateBoxPlotData (state, payload) {
    //   state.boxPlotData = payload
    // },
    // mUpdateNestedBoxPlotData (state, payload) {
    //   state.nestedBoxPlotData = payload
    // },
    // mUpdateSimpleSamplePlotData (state, payload) {
    //   state.simpleSamplePlotData = payload
    // },
    mUpdateEffectPlotData (state, payload) {
      state.effectPlotData = payload
    },
    mUpdateTFsBarPlotData (state, payload) {
      state.tfsBarPlotData = payload
    },
    mUpdateTripletsBarPlotData (state, payload) {
      state.tripletsBarPlotData = payload
    },
    mUpdateGMTableData (state, payload) {
      state.gmTableData = payload
    },
    mUpdateDrugTableData (state, payload) {
      state.drugTableData = payload
    }
  },
  actions: {
    updateDrugOptions ({ state, commit }, params) {
      Vue.http.get(apiBase + 'flow-2/drug-options', {params: params})
        .then(function (response) {
          commit('mUpdateDrugOptions', response.body)
        })
    },
    updateDrugAutocompleteOptions ({ state, commit }, params) {
      Vue.http.get(apiBase + 'flow-2/drug-autocomplete-options', {params: params})
        .then(function (response) {
          commit('mUpdateDrugAutocompleteOptions', response.body)
        })
    },
    updateGMAutocompleteOptions ({ state, commit }, params) {
      Vue.http.get(apiBase + 'flow-2/gm-autocomplete-options', {params: params})
        .then(function (response) {
          commit('mUpdateGMAutocompleteOptions', response.body)
        })
    },
    updateCTAutocompleteOptions ({ state, commit }, params) {
      Vue.http.get(apiBase + 'flow-2/ct-autocomplete-options', {params: params})
        .then(function (response) {
          commit('mUpdateCTAutocompleteOptions', response.body)
        })
    },
    updateTFAutocompleteOptions ({ state, commit }, params) {
      Vue.http.get(apiBase + 'flow-2/tf-autocomplete-options', {params: params})
        .then(function (response) {
          commit('mUpdateTFAutocompleteOptions', response.body)
        })
    },
    updateGMOptions ({ state, commit }, params) {
      Vue.http.get(apiBase + 'flow-2/gm-options', {params: params})
        .then(function (response) {
          commit('mUpdateGMOptions', response.body)
        })
    },
    updateCTOptions ({ state, commit }, params) {
      Vue.http.get(apiBase + 'flow-2/ct-options', {params: params})
        .then(function (response) {
          commit('mUpdateCTOptions', response.body)
        })
    },
    updateTFOptions ({ state, commit }, params) {
      Vue.http.get(apiBase + 'flow-2/tf-options', {params: params})
        .then(function (response) {
          commit('mUpdateTFOptions', response.body)
        })
    },
    // updateBoxPlotData ({state, commit}, params) {
    //   if (params.drugId && params.gmId && params.ctId && params.tfId) {
    //     Vue.http.get(apiBase + 'flow-2/box-plot', {params: params})
    //     .then(function (response) {
    //       console.log('p1')
    //       console.log(response.body)
    //       commit('mUpdateBoxPlotData', response.body)
    //     })
    //   }
    //   else {
    //     commit('mUpdateBoxPlotData', {})
    //   }
    // },
    // updateNestedBoxPlotData ({state, commit}, params) {
    //   if (params.drugId && params.gmId && params.ctId && params.tfId) {
    //     Vue.http.get(apiBase + 'flow-2/nested-box-plot', {params: params})
    //       .then(function (response) {
    //         console.log('p3')
    //         console.log(response.body)
    //         commit('mUpdateNestedBoxPlotData', response.body)
    //       })
    //   }
    //   else {
    //     commit('mUpdateNestedBoxPlotData', {})
    //   }
    // },
    // updateSimpleSamplePlotData ({state, commit}, params) {
    //   if (params.drugId && params.gmId && params.ctId && params.tfId) {
    //     Vue.http.get(apiBase + 'flow-2/simple-sample-plot', {params: params})
    //       .then(function (response) {
    //         console.log('p2')
    //         console.log(response.body)
    //         commit('mUpdateSimpleSamplePlotData', response.body)
    //       })
    //   }
    //   else {
    //     commit('mUpdateSimpleSamplePlotData', [])
    //   }
    // },
    updateEffectPlotData ({state, commit}, params) {
      if (params.drugId && params.gmId && params.ctId && params.tfId) {
        Vue.http.get(apiBase + 'flow-2/effect-plot', {params: params})
          .then(function (response) {
            commit('mUpdateEffectPlotData', response.body)
          })
      }
      else {
        commit('mUpdateEffectPlotData', [])
      }
    },
    updateTFsBarPlotData ({state, commit}, params) {
      Vue.http.get(apiBase + 'flow-2/tfs-bar-plot')
        .then(function (response) {
          commit('mUpdateTFsBarPlotData', response.body)
        })
    },
    updateTripletsBarPlotData ({state, commit}, params) {
      Vue.http.get(apiBase + 'flow-2/triplets-bar-plot')
        .then(function (response) {
          commit('mUpdateTripletsBarPlotData', response.body)
        })
    },
    updateGMTableData ({state, commit}, params) {
      Vue.http.get(apiBase + 'flow-2/gm-table', {params: params})
        .then(function (response) {
          commit('mUpdateGMTableData', response.body)
        })
    },
    updateDrugTableData ({state, commit}, params) {
      Vue.http.get(apiBase + 'flow-2/drug-table', {params: params})
        .then(function (response) {
          commit('mUpdateDrugTableData', response.body)
        })
    },
    selectInteractionRow (context, row) {
      return updateRoute({
        filterOnDrug: row.drugId,
        filterOnGM: row.gmId,
        filterOnCT: row.cancerType,
        filterOnTF: row.transcriptionFactor
      })
    }
  }
}
