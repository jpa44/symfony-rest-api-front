<template>
  <v-container id="dashboard-view" fluid tag="section">
    <v-row>
      <v-col cols="6">
        <v-row>
          <material-card color="orange" full-header>
            <v-btn color="green" dark @click="openAddUserDialog">
                Add a user
              </v-btn>
            <v-card-text>
              <v-data-table :headers="headers" :items="items">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon small @click="openDeleteUserDialog(item.id)">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </material-card>
        </v-row>
      </v-col>
      <v-dialog v-model="deleteUserDialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Delete a user
          </v-card-title>

          <v-card-text>
            Do you really want to delete this user?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteUserDialog = false">
              Cancel
            </v-btn>
            <v-btn color="red" text @click="confirmDeleteUser">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addUserDialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Add a user
          </v-card-title>

          <UserForm v-if="addUserDialog" />

          <v-divider></v-divider>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import MaterialCard from "@/components/MaterialCard";
import UserForm from "@/components/UserForm.vue";

export default {
  name: "DashboardView",
  data() {
    return {
      addUserDialog: false,
      deleteUserDialog: false,
      userId: null,
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id',
        },
        {
          sortable: false,
          text: 'First name',
          value: 'firstName',
        },
        {
          sortable: false,
          text: 'Roles',
          value: 'roles',
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        },
      ],
    }
  },
  components: {
    MaterialCard,
    UserForm
  },
  computed: {
    items() {
      return this.$store.state.user.users
    }
  },
  created() {
    this.getUsers(this.$store.state.auth.userToken);

  },
  methods: {
    ...mapActions(["deleteUser", "getUsers"]),
    openAddUserDialog() {
      this.userId = null;
      this.addUserDialog = true;
    },
    openDeleteUserDialog(id) {
      this.userId = id
      this.deleteUserDialog = true
    },
    confirmDeleteUser() {
      this.deleteUserDialog = false

      this.deleteUser({
        userId: this.userId,
        userToken: this.$store.state.auth.userToken
      }).then(() => {
        this.getUsers(this.$store.state.auth.userToken)
      });
    }
  }
}
</script>