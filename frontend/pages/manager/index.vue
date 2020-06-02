<template>
  <div>
    <template>
        <section class="mt-5">
            <div class="container mb-4">
                <searchbar />
            <div class="row">
                <div class="col-md-12">
                <!-- below is a form that pops up if you choose edit music or add music. the functionality of the form depends on which one you choose -->
                <div class="card" v-if="addState || editState">
                    <div class="card-body">
                    <div class="card-title mb-4">
                        <h4>{{addState?"Add Music":"Edit Music"}}</h4>
                    </div>
                    <form @submit.prevent="musicRouter()">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" v-model="musicDetails.title" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="artist">Artist</label>
                            <input type="text" v-model="musicDetails.artist" class="form-control" />
                        </div>
                        <div class="form-group" v-if="addState">
                            <label for="artist">Music</label>
                            <div class="custom-file">
                                <input
                                type="file"
                                id="customFile"
                                ref="file"
                                v-on:change="handleFileUpload()"
                                class="custom-file-input"
                                />
                                <label class="custom-file-label" for="customFile">upload mp3 or mp4</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" :disabled="isDisabled">
                                <span
                                class="spinner-border spinner-border-sm"
                                v-if="addLoading"
                                role="status"
                                aria-hidden="true"
                                ></span>Submit
                            </button>
                            <button
                                v-if="editState"
                                class="btn btn-info m-3"
                                @click="editForm">
                                Cancel
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="container">
            <!-- normal table containing all of the info about the listed songs -->
            <div class="row">
                <div class="col-md-12">
                <div class="card bg-light p-1 showdow-sm">
                    <div class="card-title">
                    <button
                        v-if="!editState"
                        class="btn btn-info m-3"
                        @click="initForm">
                        {{addState?"Cancel":"Add New Music"}}
                    </button>
                    </div>
                    <div class="card-body">
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Artist</th>
                        <th scope="col">File Path</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody
                        v-if="musicLoading"
                        class="spinner-border"
                        style="width: 3rem; height: 3rem;"
                        role="status"
                    >
                        <tr>
                            <td><span class="sr-only">Loading...</span></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr v-for="(music, index) in allmusic" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ music.title }}</td>
                        <td>{{ music.artist }}</td>
                        <td><button class="btn btn-warning"  @click="viewFilePath(music)">view</button></td>
                        <td>
                            <button class="btn btn-info" @click="deleteMusic(music.id)">Delete</button>
                        </td>
                        <td>
                            <button class="btn btn-success" v-if="!addState" @click="editForm(music)">Edit</button>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </template>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from 'axios'
import searchbar from '@/partials/searchbar'
export default {
  components: {
      searchbar
  },
  data(){
    return{
        musicDetails: {
            title: '',
            artist: '',
            music: ''
        },
        musicLoading: false,
        isValid: false,
        addLoading: false,
        addState: false,
        editState: false,
        selectedSongInfo:false
    } 
  },
  computed: {
    //get the list of songs from the vuex store
    allmusic() {
      return this.$store.state.allMusic
    },
    //if you choose to add or edit song info and you dont fill out the form completely,
    //this function will prevent the submit button from being active
    isDisabled: function() {
        if(this.editState){
            if (
                this.musicDetails.title === '' ||
                this.musicDetails.artist === '' 
            ) {
                return !this.isValid
            }
        } else if(
        this.musicDetails.title === '' ||
        this.musicDetails.artist === '' ||
        this.musicDetails.music === ''
      ) {
        return !this.isValid
      }
    }
  },
  methods:{
    //get the actual file from the form
    handleFileUpload() {
      this.musicDetails.music = this.$refs.file.files[0]
    },
    //when you submit the form, if it's activated for adding run the add function, if it's activated for editing run the edit function
    //after running either function, exit add or edit mode to get rid of the form
    musicRouter() {
        if(this.editState){
            this.editMusic()
            this.editState = false
        } else {
            this.addNewMusic()
            this.addState = false
        }
    },
    //get all the songs from the db via axios
    async getAllMusic() {
        this.musicLoading = true
        try {
            let data = await this.$axios.$get('/')
            this.$store.dispatch('setAllMusic',data)
            this.musicLoading = false
        } catch (err) {
            this.musicLoading = false
            swal('Error', 'Error Fetching Music', 'error')
        }
    },
    //add new song to db
    async addNewMusic() {
        //make sure it's an approved filetype and the text fields are entered
        let types = /(\.|\/)(mp3|mp4)$/i
        if (
        types.test(this.musicDetails.music.type) ||
        types.test(this.musicDetails.music.name)
        ) {
        //create a new form data to send the info
        let formData = new FormData()
        formData.append('title', this.musicDetails.title)
        formData.append('artist', this.musicDetails.artist)
        formData.append('music', this.musicDetails.music)
        this.addLoading = true
        try {
            //run axios post w the data and if it's successful get the new set of songs and display a popup
            const response = await this.$axios.$post('/', formData)
            this.addLoading = false
            this.musicDetails = {}
            this.getAllMusic() 
            swal('Success', 'New Music Added', 'success')
            
        }
        catch{(err => {
            this.addLoading = false
            swal('Error', 'Something Went wrong', 'error')
            console.log(err)
        })}
        //if the uploaded song is of the wrong filetype send a popup stating that
        } else {
        swal('Error', 'Invalid file type', 'error')
        return !this.isValid
        }
    },
    //function for deleting music
    async deleteMusic(id) {
        //send a popup asking if the users really want to delete the song
        swal({
            title: 'Really?',
            text: 'This is a peranent decision!',
            icon: 'warning',
            buttons: true,
            dangerMode: true
            }).then( async (willDelete) => {
            //if they do then run axios delete request
            if (willDelete) {
                try{
                    const request = await this.$axios.$delete('/' + id)
                    this.getAllMusic()
                    swal('Your Music file is no more!', {
                    icon: 'success'
                    })
                }
                catch{(err => {
                    swal('Error', 'Somethimg went wrong', 'error')
                })}
            } else {
                swal('Your Music file is safe for now!')
            }
        })
    },

    async editMusic(){
            this.addLoading = true
            //vake sure the fields aren't empty
            if (!this.musicDetails.title || !this.musicDetails.artist){
                swal('Error', 'please fill out all the fields', 'error')
            } else {
                //if fields are filled out send new song info as json
                const body = JSON.stringify(this.musicDetails)
                try {
                    const request = await axios({
                        headers: { 
                            'content-type': 'application/json'
                        },
                        method: 'put',
                        url: 'http://3.34.99.192:4000/' + this.selectedSongInfo.id,
                        data: body
                    })
                    //send popup after response
                    this.addLoading = false
                    this.getAllMusic()
                    swal('Success', 'Music Edited', 'success')
                }
                catch{(err => {
                    swal('Error', 'Something Went wrong', 'error')
                    console.log(err)
                })}
             }
        },
    //make the form visible with add settings
    initForm() {
        this.addState = !this.addState
    },
    //make the form visible with edit settings
    editForm(music) {
        this.editState = !this.editState
        this.selectedSongInfo = music
    },
    //if you want to see the file path
    viewFilePath(music){
        const filePath = JSON.parse(music.music).path
        
        swal('file path', filePath, 'success')
    },
},

  created() {
    //if the user has the cookie created by loggin in then let them stay, else push them to the login page
    if(!this.$auth.getToken('local')){
        this.$router.push('/login')
    } 
    //get the music files
    this.getAllMusic()
  }
}
</script>
