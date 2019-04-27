<template>
    <v-container fluid fill-height>

        <v-container>
            <v-container>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Role</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ createNewRole }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="newRole.name" label="Role name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="newRole.designation"
                                                      label="Role Designation"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="createRoleCancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat @click="saveRole">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-container>
            <v-data-table
                    :headers="headers"
                    :items="roles"
                    class="elevation-1"
                    :expand="expand"
                    item-key="name"
            >
                <template v-slot:items="props">
                    <tr @click="props.expanded = getRolePermissions(props.item.designation , props.expanded)">
                        <td class="text-xs-justify">{{ props.item.id }}</td>
                        <td class="text-xs-justify">{{ props.item.name }}</td>
                        <td class="text-xs-justify">{{ props.item.designation }}</td>
                        <td class="text-xs-justify">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                    small
                                    @click="deleteItem(props.item)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </tr>
                </template>
                <template v-slot:expand="expand">
                    <v-container fluid fill-height>
                        <v-data-table
                                :headers="rolePermissionsHeaders"
                                :items="rolePermissions"
                                class="elevation-1"
                        >
                            <template v-slot:items="props">
                                <td class="text-xs-justify">{{ props.item.name }}</td>
                                <td class="text-xs-justify">{{ props.item.route }}</td>
                                <td class="text-xs-justify">{{ props.item.type }}</td>
                            </template>
                        </v-data-table>
                    </v-container>
                </template>
            </v-data-table>
        </v-container>
    </v-container>
</template>

<script>
    import ApiService from '../services/api.service';

    export default {
        name: "RoleManagement",
        data() {
            return {
                expand: false,
                dialog: false,
                createNewRole: 'Create New Role',
                newRole: {
                    name: '',
                    designation: ''
                },
                headers: [
                    {text: 'Id' , value: 'id'},
                    {text: 'Name', value: 'name'},
                    {text: 'Designation', value: 'designation'},
                    {text: 'Action'}
                ],
                roles: [
                    {
                        id: '',
                        name: '',
                        designation: '',
                    }
                ],
                rolePermissionsHeaders: [
                    {text: 'Name', value: 'name'},
                    {text: 'Route', value: 'route'},
                    {text: 'Type', value: 'type'}
                ],
                rolePermissions: [
                    {
                        name: '',
                        route: '',
                        type: ''
                    }
                ]
            }
        },
        methods: {
            getRolePermissions: function (designation, expended) {
                if (expended) {
                    return false;
                }
                ApiService.get('http://localhost:8101/api/role/permissions?roleDesignation=' + designation).then(response => (this.rolePermissions = response.data));
                return true;
            },
            saveRole: function () {
                ApiService.post('http://localhost:8101/api/role', this.newRole).then(response => (this.loadRoles()));
                this.dialog = false;
            },
            createRoleCancel: function () {
                this.newRole.name = '';
                this.newRole.designation = '';
                this.dialog = false;
            },
            loadRoles: function () {
                ApiService.get('http://localhost:8101/api/roles').then(response => (this.roles = response.data));
            },
            editItem (item) {

            },

            deleteItem (item) {
                confirm('Are you sure you want to delete this item?') &&
                        ApiService.delete('http://localhost:8101/api/role?id=' + item.id).then(response =>(this.loadRoles()));
            },

        },
        created() {
            this.loadRoles();
        }
    }
</script>

<style scoped>
</style>