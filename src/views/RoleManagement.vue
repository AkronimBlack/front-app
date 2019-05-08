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
                <v-dialog v-model="extendDialog">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Extend role</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-data-table
                                            v-model="selectedRoles"
                                            :headers="extendableRolesHeaders"
                                            :items="extendableRoles"
                                            :pagination.sync="pagination"
                                            select-all
                                            item-key="name"
                                            class="elevation-1"
                                    >
                                        <template v-slot:headers="props">
                                            <tr>
                                                <th>
                                                    <v-checkbox
                                                            :input-value="props.all"
                                                            :indeterminate="props.indeterminate"
                                                            primary
                                                            hide-details
                                                            @click.stop="toggleAll"
                                                    ></v-checkbox>
                                                </th>
                                                <th
                                                        v-for="header in props.headers"
                                                        :key="header.text"
                                                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                                        @click="changeSort(header.value)"
                                                >
                                                    <v-icon small>arrow_upward</v-icon>
                                                    {{ header.text }}
                                                </th>
                                            </tr>
                                        </template>
                                        <template v-slot:items="props">
                                            <tr :active="props.selected" @click="props.selected = !props.selected">
                                                <td>
                                                    <v-checkbox
                                                            :input-value="props.selected"
                                                            primary
                                                            hide-details
                                                    ></v-checkbox>
                                                </td>
                                                <td>{{ props.item.name }}</td>
                                                <td class="text-xs-center">{{ props.item.route }}</td>
                                                <td class="text-xs-center">{{ props.item.type }}</td>
                                            </tr>
                                        </template>
                                    </v-data-table>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="extendRoleCancel">Cancel</v-btn>
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
                                            v-model="selected"
                                            :headers="permissionListHeaders"
                                            :items="permissionList"
                                            :pagination.sync="pagination"
                                            select-all
                                            item-key="name"
                                            class="elevation-1"
                                    >
                                        <template v-slot:headers="props">
                                            <tr>
                                                <th>
                                                    <v-checkbox
                                                            :input-value="props.all"
                                                            :indeterminate="props.indeterminate"
                                                            primary
                                                            hide-details
                                                            @click.stop="toggleAll"
                                                    ></v-checkbox>
                                                </th>
                                                <th
                                                        v-for="header in props.headers"
                                                        :key="header.text"
                                                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                                        @click="changeSort(header.value)"
                                                >
                                                    <v-icon small>arrow_upward</v-icon>
                                                    {{ header.text }}
                                                </th>
                                            </tr>
                                        </template>
                                        <template v-slot:items="props">
                                            <tr :active="props.selected" @click="props.selected = !props.selected">
                                                <td>
                                                    <v-checkbox
                                                            :input-value="props.selected"
                                                            primary
                                                            hide-details
                                                    ></v-checkbox>
                                                </td>
                                                <td>{{ props.item.name }}</td>
                                                <td class="text-xs-center">{{ props.item.route }}</td>
                                                <td class="text-xs-center">{{ props.item.type }}</td>
                                            </tr>
                                        </template>
                                    </v-data-table>

                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="addPermissionsDialogCancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat @click="addPermissions">Save</v-btn>
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
                        <v-icon
                                class="mr-2"
                                @click="openExtendDialog(props.item)"
                        >
                            extension
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
    import {mapActions} from "vuex";

    export default {
        name: "RoleManagement",
        data() {
            return {
                expand: false,
                newDialog: false,
                editDialog: false,
                addPermissionsDialog: false,
                extendDialog: false,
                pagination: {
                    sortBy: 'name'
                },
                selected: [],
                selectedRoles: [],
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
                ],
                permissionListHeaders: [
                    {text: 'Name', value: 'name'},
                    {text: 'Route', value: 'route'},
                    {text: 'Type', value: 'type'}
                ],
                permissionList: [
                    {
                        name: '',
                        route: '',
                        type: ''
                    }
                ],
                extendableRoles: [
                    {
                        id: '',
                        name: '',
                        designation: '',
                        extended: false
                    }
                ],
                extendableRolesHeaders: [
                    {text: 'Id', value: 'id'},
                    {text: 'Name', value: 'name'},
                    {text: 'Designation', value: 'designation'},
                    {text: 'Action'}
                ]
            }
        },
        methods: {
            ...mapActions([
                'handleError'
            ]),
            getRolePermissions: function (designation, expended) {
                if (expended) {
                    return false;
                }
                ApiService.get('http://localhost:8101/api/role/permissions?roleDesignation=' + designation).then(response => (this.rolePermissions = response.data));
                return true;
            },
            saveRole: function () {
                ApiService.post('http://localhost:8101/api/role', this.newRole).then(this.loadRoles());
                this.newDialog = false;
            },
            createRoleCancel: function () {
                this.newRole.name = '';
                this.newRole.designation = '';
                this.newDialog = false;
            },
            loadRoles: function () {
                ApiService.get('http://localhost:8101/api/roles').then(response => this.roles = response.data);
            },
            deleteItem(item) {
                confirm('Are you sure you want to delete this item?') &&
                ApiService.delete('http://localhost:8101/api/role?id=' + item.id)
                    .then(response => {
                        this.loadRoles();
                    }).catch(error => {
                        this.handleError({errorMsg: error.response.data})
                });
            },
            openEditDialog(item) {
                this.editRole.id = item.id;
                this.editRole.name = item.name;
                this.editRole.designation = item.designation;
                this.editDialog = true;
            },
            editRoleCancel() {
                this.editRole.id = '';
                this.editRole.name = '';
                this.editRole.designation = '';
                this.editDialog = false;
            },
            editItem() {
                ApiService.put('http://localhost:8101/api/role', this.editRole).then(this.loadRoles());
                this.editDialog = false;
            },
            toggleAll() {
                if (this.selected.length) this.selected = []
                else this.selected = this.permissionList.slice()
            },
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
            openPermissionDialog(item) {
                ApiService.get('http://localhost:8101/api/permissions?roleId=' + item.id).then(response => (this.setPermissionsData(response.data)));
                this.editRole.id = item.id;
                this.addPermissionsDialog = true;
            },
            setPermissionsData(data) {
                this.permissionList = data;
                let selected = [];
                data.forEach(function (item) {
                        if (item.hasPermission === true) {
                            selected.push(item);
                        }
                    }
                );
                this.selected = selected;
            },
            addPermissionsDialogCancel() {
                this.editRole.id = '';
                this.addPermissionsDialog = false;
                this.selected = [];
                this.permissionList = [];
            },
            addPermissions() {
                let data = {'roleId': this.editRole.id, 'permissions': this.selected};
                ApiService.post('http://localhost:8101/api/role/permission', data);
                this.addPermissionsDialogCancel();
                this.loadRoles();
            },
            openExtendDialog(item){
                ApiService.get('http://localhost:8101/api/role/extend?roleDesignation=' + item.designation).then(response => (this.extendableRoles = response.data));
                this.extendDialog = true;
            },
            extendRoleCancel(){
                this.extendDialog = true;
                this.extendableRoles = []
            }
        },
        created() {
            this.loadRoles();
        }
    }
</script>

<style scoped>
</style>