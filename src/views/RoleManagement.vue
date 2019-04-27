<template>
    <v-container fluid fill-height>

        <v-container>
            <v-container>
                <v-dialog v-model="newDialog">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Role</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Create new role</span>
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

            <v-container>
                <v-dialog v-model="editDialog">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Edit role</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editRole.id" label="Role name" readonly></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editRole.name" label="Role name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editRole.designation"
                                                      label="Role Designation"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="editRoleCancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat @click="editItem">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-container>

            <v-container>
                <v-dialog v-model="addPermissionsDialog">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Create new role</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-data-table
                                            :headers="permissionsHeaders"
                                            :items="permissions"
                                            class="elevation-1"
                                            :expand="expand"
                                            item-key="name"
                                    >
                                        <template v-slot:items="props">
                                            <td class="text-xs-justify">
                                                <v-icon
                                                        class="mr-2"
                                                        @click="addPermission(props.item)"
                                                >
                                                    add_box
                                                </v-icon>
                                            </td>
                                            <td class="text-xs-justify">{{ props.item.name }}</td>
                                            <td class="text-xs-justify">{{ props.item.route }}</td>
                                            <td class="text-xs-justify">{{ props.item.type }}</td>
                                        </template>
                                        <template v-slot:expand="expand">
                                            <v-container fluid fill-height>
                                                <v-data-table
                                                        :headers="permissionsHeaders"
                                                        :items="permissions"
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
                        <td class="text-xs-justify">{{ props.item.id }}</td>
                        <td class="text-xs-justify">{{ props.item.name }}</td>
                        <td class="text-xs-justify">{{ props.item.designation }}</td>

                        <td class="text-xs-justify">
                            <v-icon
                                    class="mr-2"
                                    @click="props.expanded = getRolePermissions(props.item.designation , props.expanded)"
                            >
                                more_vert
                            </v-icon>
                            <v-icon
                                    class="mr-2"
                                    @click="openEditDialog(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                    class="mr-2"
                                    @click="deleteItem(props.item)"
                            >
                                delete
                            </v-icon>
                            <v-icon
                                    class="mr-2"
                                    @click="openPermissionDialog(props.item)"
                            >
                                add_box
                            </v-icon>
                        </td>
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
                newDialog: false,
                editDialog: false,
                addPermissionsDialog: false,
                newRole: {
                    name: '',
                    designation: ''
                },
                editRole: {
                    id: '',
                    name: '',
                    designation: ''
                },
                headers: [
                    {text: 'Id', value: 'id'},
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
                ],
                permissionsHeaders: [
                    {text: 'Action'},
                    {text: 'Name', value: 'name'},
                    {text: 'Route', value: 'route'},
                    {text: 'Type', value: 'type'}
                ],
                permissions: [
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
            deleteItem(item) {
                confirm('Are you sure you want to delete this item?') &&
                ApiService.delete('http://localhost:8101/api/role?id=' + item.id).then(response => (this.loadRoles()));
            },
            openEditDialog(item){
                this.editRole.id = item.id;
                this.editRole.name = item.name;
                this.editRole.designation = item.designation;
                this.editDialog = true;
            },
            editRoleCancel(){
                this.editRole.id = '';
                this.editRole.name = '';
                this.editRole.designation = '';
                this.editDialog = false;
            },
            editItem() {
                ApiService.put('http://localhost:8101/api/role', this.editRole).then(response => (this.loadRoles()));
                this.editDialog = false;
            },
            openPermissionDialog(item)
            {
                this.addPermissionsDialog = true;
            },
            addPermission(item){

            }
        },
        created() {
            this.loadRoles();
        }
    }
</script>

<style scoped>
</style>