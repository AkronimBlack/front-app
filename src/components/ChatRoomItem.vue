<template>
    <v-card
            class="mx-auto"
            max-width="344"
            outlined
    >
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        {{name}}
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-btn @click="joinRoom" text>Join</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {STORE_ACTIONS} from "./../utils/config";

    export default {
        name: "ChatRoomItem",
        props: ['roomName'],
        data() {
            return {
                name: this.roomName
            }
        },
        methods: {
            joinRoom() {
                this.$store.dispatch(STORE_ACTIONS.joinRoom, this.name)
                this.$router.push({name: 'chat', params: {room: this.name}})
            }
        },
    }
</script>

<style scoped>

</style>