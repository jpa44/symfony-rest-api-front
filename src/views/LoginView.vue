<template>
  <v-app class="login">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3>
            <v-card class="elevation-12">
              <v-card-text>
                <img src="@/assets/logo.png" width="80" />
                <h2>{{ isRegister ? stateObj.register.name : stateObj.login.name }} to use our service</h2>
              </v-card-text>
              <v-card-text>
                <form ref="form" @submit.prevent="isRegister ? signup() : signin()">
                  <v-text-field v-if="isRegister" v-model="firstName" name="firstName" label="First name" type="username"
                    placeholder="First name" required></v-text-field>

                  <v-text-field v-model="email" name="email" label="Email" type="text" placeholder="email" required>
                  </v-text-field>

                  <v-text-field v-model="password" name="password" label="Password" type="password"
                    placeholder="password" required></v-text-field>

                  <v-text-field v-if="isRegister" v-model="confirmPassword" name="confirmPassword"
                    label="Confirm Password" type="password" placeholder="confirm password" required></v-text-field>

                  <div class="red--text"> {{ errorMessage }}</div>
                  <v-btn type="submit" class="mt-4" color="primary" value="log in">
                    {{ isRegister ? stateObj.register.name : stateObj.login.name }}
                  </v-btn>
                  <div class="grey--text mt-4" v-on:click="isRegister = !isRegister;">
                    {{ toggleMessage }}
                  </div>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios';

export default {
  name: "LoginView",
  data() {
    return {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isRegister: false,
      errorMessage: "",
      stateObj: {
        register: {
          name: 'Sign up',
          message: 'Sign in to existing account'
        },
        login: {
          name: 'Sign in',
          message: 'Register'
        }
      }
    };
  },
  methods: {
    ...mapActions(["logIn", "register", "getAuthUser"]),
    signin() {
      this.errorMessage = "";

      this.logIn({
        email: this.email,
        password: this.password
      }).then(() => {
        this.errorMessage = "";

        this.getAuthUser().then(() => {
          this.$router.push({ name: "Dashboard" })
        });

      }).catch((error) => {
        console.error(error)
        this.errorMessage = "Invalid username or password";
      });
    },
    signup() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "password did not match"
        return;
      }

      this.errorMessage = "";

      axios.post('register',
        JSON.stringify({
          firstName: this.firstName,
          email: this.email,
          password: this.password
        }),
        {
          headers: { "Content-Type": "application/json" }
        }).then(() => {
          this.isRegister = false;
        }).catch((error) => {
          console.error(error)
        });
    }
  },
  computed: {
    toggleMessage: function () {
      return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message
    }
  }
};
</script>

<style lang="scss">
.login {
  background-color: #242939 !important;
}
</style>