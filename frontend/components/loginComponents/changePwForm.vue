<template>
<div class="container">
    <h1>Change Password</h1>
    <div class="card-body">
        <form @submit.prevent="formSubmit">
            <div class="form-group">
                <label for="title">userId</label>
                <input type="text" v-model="userInfo.userId" class="form-control" />
            </div>
            <div class="form-group">
                <label for="title">old password</label>
                <input type="password" v-model="userInfo.oldPd" class="form-control" />
            </div>
            <div class="form-group">
                <label for="artist">new password</label>
                <input type="password" v-model="userInfo.newPd" class="form-control" placeholder="please use uppercase, lowercase and at least one number"/>
            </div>
            <div class="form-group">
                <label for="artist">verify</label>
                <input type="password" v-model="userInfo.verify" class="form-control" />
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
import axios from 'axios'
export default {
    data () {
        return{
            userInfo:{
                userId:'',
                oldPd:'',
                newPd:'',
                verify:''
            }
            
        }

    },
    methods: {
        pwRegex(pw){
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/
            return regex.test(pw)
        },
        //make sure that all the fields are filled in on the form
        formSubmit(){
            if(!this.pwRegex(this.userInfo.newPd)){
                console.log(this.pwRegex(this.userInfo.newPd))
               swal('Error', 'follow the password rules', 'error')
                return 
            }
            //if the new pw and verify don't match, send 
            if(this.userInfo.newPd !== this.userInfo.verify){
                swal('Error', 'your new password and verification dont match', 'error')
                return
            }
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
                this.changePW()
            }

        },
        //put request to change the user pw based on form data
        async changePW() {
            const body = JSON.stringify(this.userInfo)
            try{
            const request = await axios({
                headers: { 
                    'content-type': 'application/json'
                },
                method: 'put',
                url: 'http://3.34.99.192:4000/user/pw',
                data: body
            })
                
            swal('Success', 'password changed', 'success')
            this.$store.dispatch('loginFormVersion','login')
            }
            catch{(err => {
                swal('Error', 'Something Went wrong', 'error')
                console.log(err)
            })}
            }
    }
    
}
</script>
<style scoped>

.container{
    background-color: lightblue;
}
</style>