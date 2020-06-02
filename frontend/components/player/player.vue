<template>
  <section v-if="allmusic">
    <div class="container">
      <div class="row mt-5 flex">
        <div class="col-md-6">
          <div class="card player_card">
            <div class="card-body">
              <h6 class="card-title">
                <b>{{this.current.title}} - {{this.current.artist}}</b>
              </h6>
              <div class="flex">
                <img src="https://live.staticflickr.com/65535/49948341447_125951ecf5_z.jpg" alt="prev" @click="prev">
                <img src="https://live.staticflickr.com/65535/49948050841_98a4159d25_z.jpg" alt="play" v-if="!isplaying" @click="play(music)">
                <img src="https://live.staticflickr.com/65535/49948341427_34edd425a1_z.jpg" alt="pause" v-else @click="pause">
                <img src="https://live.staticflickr.com/65535/49947549818_ae60e4b333_z.jpg" alt="next" @click="next"> 
              </div>
            </div>
            </div>
          
        </div>
        </div>
    </div>
  </section>
</template>
<script>
//this is the music player section
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      current: {
        title: '',
        artist: ''
      },
      song: true,
      isplaying: false,
      index: 0,
      player: {},
      music:'',
      songCount:0
    }
    //to get sutoplay to work add muted:'muted' to player
  },
  computed: {
    //get the list of songs from the vuex store
    async allmusic () {
      const musicList = this.$store.state.allMusic
      if (musicList.length > 0){
         try {
          this.song = false
          this.allMusic = musicList
        } catch (err) {
          this.current = null
          console.log(err)
        }
      }

      return this.$store.state.allMusic
    },
    searchedTerm () {
      const title = this.$store.state.searchedTitle
      console.log(this.$store.state.searchedTitle)
      return title
    }
  },
  methods: {
    //set up the media player with the loaded songs
     async initPlayer() {
      if (this.allMusic !== []) {
        this.current = await this.allMusic[this.index]
        const fileInfo = JSON.parse(this.current.music)
        this.player.src = `http://3.34.99.192:4000/${fileInfo.path}`
      } else {
        this.song = true
      }
    },
    //get songs
      async getAllSongs() {
        try {
        let response = await this.$axios.$get('/')
        if (response === []) {
          this.song = true
          this.current = null
        } else {
          this.song = false
          this.allMusic = response
        }
        await this.initPlayer()
      } catch (err) {
        this.current = null
        console.log(err)
      }
    },
    //play the selected song 
    play(song) {
      if (song) {
        this.current = song
        const fileInfo = JSON.parse(this.current.music)
        this.player.src = `http://3.34.99.192:4000/${fileInfo.path}`
      }
      this.player.play()
      this.isplaying = true
    },
    pause() {
      this.player.pause()
      this.isplaying = false
    },
    next() {
      this.index++
      if (this.index > this.allMusic.length - 1) {
        this.index = 0
      }
       this.current = this.allMusic[this.index]
      this.play(this.current)
    },
    prev() {
      this.index--
      if (this.index < 0) {
        this.index = this.allMusic.length - 1
      }
      this.current = this.allMusic[this.index]
      this.play(this.current)
    },
  },
  created() {
 if (process.client) {
      this.player = new Audio()
    }
    this.getAllSongs()
  }
}
</script>
<style  scoped>
img{
    margin:10px;
    width:50px;
    height:50px;
}
.flex{
    display:flex;
    justify-content: center;
}
</style>