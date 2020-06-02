<template>
    <div>
    <template>
        <section class="mt-5">
            <div class="container mb-4">
            <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card bg-light p-1 showdow-sm flex">
                    <div class="card-title">
                    <button
                        class="btn btn-success m-3"
                        @click="setLoginForm('login')">
                        Login
                    </button>
                    <button
                        class="btn btn-warning m-3"
                        @click="setLoginForm('register')">
                        Register
                    </button>
                    <button
                        class="btn btn-info m-3"
                        @click="setLoginForm('pw')">
                        Change Password
                    </button>
                    </div>
                    <!-- main login form -->
                    <div>
                        <loginForm v-if="formChoice ==='login'" />
                        <registrationForm v-else-if="formChoice ==='register'"/>
                        <changePwForm v-else/>
                    </div>
                    
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
import changePwForm from '../components/loginComponents/changePwForm'
import loginForm from '../components/loginComponents/loginForm'
import registrationForm from '../components/loginComponents/registrationForm'
export default {
    data (){
        return{
        }
    },
    components: {
        changePwForm,
        loginForm,
        registrationForm
    },
    computed:{
        formChoice(){
            return this.$store.state.formChoice
        }
    },
    methods: {
        setLoginForm(version) {
            this.$store.dispatch('loginFormVersion',version)
        },
        setRegistration() {
            this.formChoice = 'register'
        },
        setPw() {
            this.formChoice = 'pw'
        }
    }

  



}
</script>
<style scoped>
.flex{
    display:flex;
    justify-content: space-between;
}
</style>