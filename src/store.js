export default {
    state() {
        return {
            preferences: {
                showInitialTutorial: true,
                servicesNumberPerPage: 10,
                servicesTableHeaderLock: false,
                isDrawerMinified: true
            }
        }
    },
    mutations: {
        loadPreferences(state, oldPreferenceFromLocalStorage) {
            state.preferences = oldPreferenceFromLocalStorage
        },
        savePreferences(state) {
            window.localStorage['user-preferences'] = JSON.stringify(state.preferences)
        },
        updatePreference(state, {fieldToUpdate, updatedValue}) {
            if (fieldToUpdate === 'showInitialTutorial')
                state.preferences.showInitialTutorial = updatedValue
            if (fieldToUpdate === 'servicesNumberPerPage')
                state.preferences.servicesNumberPerPage = updatedValue
            if (fieldToUpdate === 'servicesTableHeaderLock')
                state.preferences.servicesTableHeaderLock = updatedValue
            if (fieldToUpdate === 'isDrawerMinified')
                state.preferences.isDrawerMinified = updatedValue
        }
    },
    actions: {
        loadDefaultPreferences({commit, state}) {
            let preferences
            if (window.localStorage.hasOwnProperty("user-preferences")) {
                preferences = JSON.parse(window.localStorage.getItem("user-preferences"))
            } else {
                preferences = state.preferences
                commit('savePreferences')
            }
            commit('loadPreferences', preferences)
        },
        updatePreferences({commit}, {fieldToUpdate, updatedValue}) {
            commit('updatePreference', {fieldToUpdate, updatedValue})
            commit('savePreferences')
        }
    }
}