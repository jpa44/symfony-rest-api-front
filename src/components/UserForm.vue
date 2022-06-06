<template>
    <material-card color="primary">
        <v-form>
            <v-container class="py-0">
                <v-row>
                    <v-col cols="6" md="6">
                        <v-text-field color="purple" label="First name" v-model="firstName" />
                    </v-col>

                    <v-col cols="6" md="6">
                        <v-text-field color="purple" label="Email" v-model="email" />
                    </v-col>

                </v-row>
                <v-row>
                    <v-col cols="6" md="6">
                        <v-text-field color="purple" type="password" label="Password" v-model="password" />
                    </v-col>

                    <v-col cols="6" md="6">
                        <v-select v-model="selectedRole" :items="roles" label="Roles"></v-select>
                    </v-col>
                </v-row>
                <v-row class="text-right">
                    <v-col cols="12">
                        <v-btn color="primary" min-width="150" @click="submit">
                            {{ userId ? 'Edit' : 'Add' }} user
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </material-card>
</template>

<script>
import MaterialCard from "@/components/MaterialCard";
import { mapActions } from "vuex";
export default {
    name: "UserForm",
    data() {
        return {
            errorMessage: "",
            firstName: "",
            email: "",
            password: "",
            selectedRole: null
        }
    },
    props: {
        userId: Number
    },
    components: {
        MaterialCard,
    },
    computed: {
        roles() {
            return [
                'ROLE_USER',
                'ROLE_ADMIN'
            ]
        }
    },
    methods: {
        ...mapActions(["newUser"]),
        submit() {
            this.newUser({
                firstName: this.firstName,
                email: this.email,
                roles: [this.selectedRole],
                password: this.password,
                userToken: this.$store.state.auth.userToken
            }
            ).then(() => {
                this.errorMessage = "";

            }).catch((error) => {
                console.error(error)
                this.errorMessage = "";
            });
        }
    }
}
</script>