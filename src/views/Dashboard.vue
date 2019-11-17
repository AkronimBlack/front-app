<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <ChatRoom v-for="room in this.rooms" v-bind:key="room.id" :roomName="room"></ChatRoom>
        </v-layout>
    </v-container>
</template>

<script>
    import { STORE_ACTIONS, url } from "./../utils/config";
    import ApiService from "../services/api.service";
    import ChatRoom from "../components/ChatRoomItem";
    import {mapGetters} from "vuex";
    export default {
        name: "Dashboard",
        components:{ChatRoom},
        data() {
            return {
                join_room_name: null
            }
        },
        created(){
            ApiService.get(url + '/rooms').then(response => (
                    this.$store.dispatch(STORE_ACTIONS.setRooms, response.data)
            ))
        },
        computed: {
            ...mapGetters([
                'rooms'
            ])
        },
    }
</script>

<style scoped>

</style>