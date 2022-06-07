<template>
  <v-navigation-drawer permanent app>
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ $store.state.auth.authUser.firstName }}
          </v-list-item-title>
          <v-list-item-subtitle v-on:click="logout">log out</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>

        <v-list-item-icon v-if="item.roles.includes(userRole)">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content :to="{ path: item.path }" v-if="item.roles.includes(userRole)">
          <router-link :to="{ path: item.path }">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </router-link>
        </v-list-item-content>

      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: 'Documents', icon: 'mdi-view-dashboard', path: '/dashboard', roles : ['ROLE_USER', 'ROLE_ADMIN'] },
        { title: 'Document Type', icon: 'mdi-file-document-outline', path: '/document_type', roles : ['ROLE_ADMIN'] },
        { title: 'Users', icon: 'mdi-account-group', path: '/users', roles : ['ROLE_ADMIN'] },
      ],
    }
  },
  computed: {
    userRole(){
      return this.$store.state.auth.authUser.roles[0]
    }
  },
  methods: {
    ...mapActions(["logOut"]),
    logout() {
      this.logOut();
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>

<style lang="scss">
.v-navigation-drawer {
  background-color: #111827 !important;

  .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #FFFFFF !important
  }

  a {
    color: #FFFFFF !important;
    text-decoration: none;
  }

  .v-icon {
    color: #FFFFFF !important
  }

}
</style>