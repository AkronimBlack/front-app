<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email" ></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" id="password" v-model="password"
                                          type="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="handleSubmit">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

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
        props:{

        },
        methods: {
            ...mapActions([
                'login'
            ]),
            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                if (this.email != '' && this.password != '') {
                    this.login({email: this.email, password: this.password , url: 'http://localhost:8100/api/user/token/create'})
                    this.password = ""
                }
            }
        }
    };
</script>
<style scoped>

</style>