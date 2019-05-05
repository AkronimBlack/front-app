<template>
    <v-dialog
            v-model="errorActive"
            width="500"
    >
        <v-card>
            <v-card-title
                    class="headline grey lighten-2"
                    primary-title
            >
                Error
            </v-card-title>

            <v-card-text>
                {{errorMsg}}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        flat
                        @click="closeErrorDialog"
                >
                    I accept
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters , mapActions} from "vuex";

    export default {
        name: "Error",
        computed: {
            ...mapGetters([
                'errorActive',
                'errorMsg'
            ])
        },
        methods: {
            ...mapActions([
                'closeErrorDialog'
            ])
        }
    }
</script>

<style scoped>

</style>