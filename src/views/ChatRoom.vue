<template>
    <div>
        Chat Room {{this.currentRoom}}
        <v-container fluid fill-height>
            <v-layout justify-center align-center>
                <div v-for="user in this.roomUsers" v-bind:key="user.id">
                    <v-card
                            class="mx-auto"
                            max-width="344"
                            outlined
                    >
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        {{user}}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn @click="" text>Call</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-layout>
        </v-container>

    </div>
</template>

<script>
    import {WS_EVENTS} from "../utils/config";

    export default {
        name: "ChatRoom",
        props:['room'],
        data() {
            return {
                currentRoom: this.room,
                roomUsers: []
            }
        },
        created() {
            this.$socket.emit(WS_EVENTS.joinRoom, this.currentRoom)
            this.sockets.subscribe('new_room_user', (data) => {
                if(!this.roomUsers.includes(data['user'])){
                    this.roomUsers.push(data['user'])
                }

            })
        }
    }
</script>

<style scoped>

</style>