<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            Login
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
        name: "login",
        data() {
            return {
                email: "",
                password: "",
            };
        },
        computed: {
            ...mapGetters([
                'authenticating',
                'authenticationError',
                'authenticationErrorCode'
            ])
        },
        methods: {
            ...mapActions([
                'login'
            ]),
            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                if (this.email != '' && this.password != '') {
                    this.login({email: this.email, password: this.password})
                    this.password = ""
                }
            }
        }
    };
</script>
<style scoped>

</style>