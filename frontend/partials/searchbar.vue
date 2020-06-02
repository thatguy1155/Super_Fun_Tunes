<template>
    <div class="md-form active-cyan active-cyan-2 mb-3 flex">
        <input class="form-control" type="text" v-model="searchedTitle" @change="filterResults" placeholder="Search" aria-label="Search">
        <button class="btn btn-info" @click="filterResults">Search</button>
    </div>
</template>

<script>

//this page is for the search bar component on the music editing page
import { mapActions, mapGetters, mapState } from "vuex";
export default {
    data () {
      return {
        searchedTitle: "",
      }
    },
    methods:{
        async filterResults(){
            await this.getAllMusic()  
            this.$store.dispatch('filterMusicList',this.searchedTitle)
        },
        async getAllMusic() {
            try {
                let data = await this.$axios.$get('/')
                this.$store.dispatch('setAllMusic',data)
            } catch (err) {
                swal('Error', 'Error Fetching Music', 'error')
            }
        },
    }
    
}
</script>

<style scoped>
.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #4dd0e1;
    box-shadow: 0 1px 0 0 #4dd0e1;
}

.flex{
    display:flex;

}

</style>