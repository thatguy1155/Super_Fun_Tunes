<template>
<div class="container">
    <h1>Login</h1>
    <div class="card-body">
        <form @submit.prevent="formSubmit">
            <div class="form-group">
                <label for="artist">user id</label>
                <input type="text" v-model="userInfo.userId" class="form-control" />
            </div>
            <div class="form-group">
                <label for="artist">password</label>
                <input type="password" v-model="userInfo.pw" class="form-control" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    </div>
</div>
    
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from 'axios'
export default {
    data () {
        return{
            userInfo:{
                userId:'',
                pw:''
            }
            
        }

    },
    methods: {
        async formSubmit(){
            
            //go through all the values entered in the form.
            //if they're empty add it to an array of empty fields
            //if the length of empty fields in greater than zero,
            //show error message, otherwise register the user.
            const values = Object.values(this.userInfo)
            const errors = []
            for (const value of values) {
                if (value === ''){
                    errors.push('error')
                } 
            }
            if (errors.length !== 0){
                swal('Error', 'please fill out all the fields', 'error')
            } else {
                
                //run axios post w login info to get token
                try {
                 const resp = await axios({
                    headers: { 
                        'content-type': 'application/json'
                    },
                    method: 'post',
                    url: 'http://3.34.99.192:4000/user/login',
                    data: this.userInfo
                    })
                //if you receive token set it in cookies and run a second axios post for user data
                this.$auth.setToken('local',resp.data.access_token)
                this.$auth.ctx.app.$axios.setHeader('Authorization', resp.data.access_token)
                const userResp = await axios({
                    headers: { 
                        'Authorization': resp.data.access_token
                    },
                    method: 'get',
                    url: 'http://3.34.99.192:4000/user/me',
                    data: this.userInfo})
                //set the user once logged in
                this.$auth.setUser(JSON.parse(userResp.config.data)) 
                this.$router.push('/') 
                    
                }
                catch{(err => {
                    swal('Error', 'your username or password are incorrect', 'error')
                    console.log(err)
                })}
            }

        }
    }
    
}
</script>
<style scoped>

.container{
    background-color: lightgreen;
}
</style>