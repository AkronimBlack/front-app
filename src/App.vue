<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                fixed
                app
        >
            <v-list dense>
                <template v-for="item in navItems">
                    <v-layout
                            v-if="item.heading"
                            :key="item.heading"
                            row
                            align-center
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group
                            v-else-if="item.children"
                            :key="item.text"
                            v-model="item.model"
                            :prepend-icon="item.model ? item.icon : item['icon-alt']"
                            append-icon=""
                    >
                        <template v-slot:activator>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ item.text }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                        <v-list-tile
                                v-for="(child, i) in item.children"
                                :key="i"
                        >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" :to="item.link">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                color="blue darken-3"
                dark
                app
                fixed
        >
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            </v-toolbar-title>
            <!--<v-text-field-->
            <!--flat-->
            <!--solo-inverted-->
            <!--hide-details-->
            <!--prepend-inner-icon="search"-->
            <!--label="Search"-->
            <!--class="hidden-sm-and-down"-->
            <!--&gt;</v-text-field>-->
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>person</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-tile
                            v-for="(item, index) in userItems"
                            :key="index"
                            @click="logout"
                    >
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>


        <v-content>
            <Error></Error>
            <router-view></router-view>
        </v-content>
        <!--<v-btn-->
                <!--fab-->
                <!--bottom-->
                <!--right-->
                <!--color="pink"-->
                <!--dark-->
                <!--fixed-->
                <!--@click="dialog = !dialog"-->
        <!--&gt;-->
            <!--<v-icon>add</v-icon>-->
        <!--</v-btn>-->
        <!--<v-dialog v-model="dialog" width="800px">-->
            <!--<v-card>-->
                <!--<v-card-title-->
                        <!--class="grey lighten-4 py-4 title"-->
                <!--&gt;-->
                    <!--Create contact-->
                <!--</v-card-title>-->
                <!--<v-container grid-list-sm class="pa-4">-->
                    <!--<v-layout row wrap>-->
                        <!--<v-flex xs12 align-center justify-space-between>-->
                            <!--<v-layout align-center>-->
                                <!--<v-avatar size="40px" class="mr-3">-->
                                    <!--<img-->
                                            <!--src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"-->
                                            <!--alt=""-->
                                    <!--&gt;-->
                                <!--</v-avatar>-->
                                <!--<v-text-field-->
                                        <!--placeholder="Name"-->
                                <!--&gt;</v-text-field>-->
                            <!--</v-layout>-->
                        <!--</v-flex>-->
                        <!--<v-flex xs6>-->
                            <!--<v-text-field-->
                                    <!--prepend-icon="business"-->
                                    <!--placeholder="Company"-->
                            <!--&gt;</v-text-field>-->
                        <!--</v-flex>-->
                        <!--<v-flex xs6>-->
                            <!--<v-text-field-->
                                    <!--placeholder="Job title"-->
                            <!--&gt;</v-text-field>-->
                        <!--</v-flex>-->
                        <!--<v-flex xs12>-->
                            <!--<v-text-field-->
                                    <!--prepend-icon="mail"-->
                                    <!--placeholder="Email"-->
                            <!--&gt;</v-text-field>-->
                        <!--</v-flex>-->
                        <!--<v-flex xs12>-->
                            <!--<v-text-field-->
                                    <!--type="tel"-->
                                    <!--prepend-icon="phone"-->
                                    <!--placeholder="(000) 000 - 0000"-->
                                    <!--mask="phone"-->
                            <!--&gt;</v-text-field>-->
                        <!--</v-flex>-->
                        <!--<v-flex xs12>-->
                            <!--<v-text-field-->
                                    <!--prepend-icon="notes"-->
                                    <!--placeholder="Notes"-->
                            <!--&gt;</v-text-field>-->
                        <!--</v-flex>-->
                    <!--</v-layout>-->
                <!--</v-container>-->
                <!--<v-card-actions>-->
                    <!--<v-btn flat color="primary">More</v-btn>-->
                    <!--<v-spacer></v-spacer>-->
                    <!--<v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>-->
                    <!--<v-btn flat @click="dialog = false">Save</v-btn>-->
                <!--</v-card-actions>-->
            <!--</v-card>-->
        <!--</v-dialog>-->
    </v-app>
</template>

<script>
    import {mapActions} from "vuex";
    import Error from "./components/Error";

    export default {
        components: {Error},
        data: () => ({
            dialog: false,
            drawer: null,
            navItems: [
                {icon: 'dashboard', text: 'Dashboard', link: '/'},
                // {icon: 'contacts', text: 'Contacts', link: '/contacts'},
                {icon: 'help', text: 'Calender', link: '/calender'},
                {icon: 'settings', text: 'Settings', link: '/settings'},
                {icon: 'desktop_access_disabled', text: 'Roles', link: '/roles'},
                {icon: 'help', text: 'Help', link: '/help'},
            ],
            userItems: [
                { title: 'Logout' }
            ]
        }),
        props: {},
        methods: {
            ...mapActions([
                'logout'
            ])
        }
    }
</script>