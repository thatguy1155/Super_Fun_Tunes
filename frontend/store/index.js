import axios from 'axios'
export const state = () => ({
    searchedTitle: "",
    allMusic:[],
    song:true,
    songCount:0,
    formChoice:'login'
  })
  //vuex store keeping track of the songs pulled from db so that they're more immediately visable
  export const mutations = {
    SET_All_MUSIC(state, payload) {
        state.songCount = payload.length
        state.allMusic = payload;  
    },
    ADD_MUSIC(state, payload) {
        state.allMusic.push(payload)
    },
    FILTER_MUSIC(state,payload) {
        const newList = state.allMusic.filter((item) => {
            return item.title.includes(payload);
            });
        state.searchedTitle = payload
        state.allMusic = newList
    },
    LOG_IN_FORM_VERSION(state,payload){
        state.formChoice = payload
    }
  }

  export const actions = {
    setAllMusic({ commit },arrayOfMusic){
        commit('SET_All_MUSIC', arrayOfMusic)
    },
    addToMusicList({ commit },newSong){
        commit('SET_All_MUSIC', newSong)
    },
    filterMusicList({ commit },searchQuery){
        commit('FILTER_MUSIC', searchQuery)
    },
    loginFormVersion({ commit },version){
        commit('LOG_IN_FORM_VERSION',version)
    } 
}
    
    