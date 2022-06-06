<template>
    <material-card color="primary">
        <v-form>
            <v-container class="py-0">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field color="purple" label="Name" v-model="name" />
                    </v-col>

                    <v-col cols="12" class="text-right">
                        <v-btn color="primary" min-width="150" @click="submit">
                            Add document type
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-alert :value="alert" type="success">
            Document Type added
        </v-alert>
    </material-card>
</template>

<script>
import MaterialCard from "@/components/MaterialCard";
import { mapActions } from "vuex";
export default {
    name: "DocumentTypeForm",
    data() {
        return {
            errorMessage: "",
            name: "",
            alert: false
        }
    },
    components: {
        MaterialCard,
    },
    methods: {
        ...mapActions(["newDocumentType"]),
        submit() {
            this.newDocumentType({
                name: this.name,
                userToken: this.$store.state.auth.userToken
            },

            ).then(() => {
                this.errorMessage = "";
                this.name = ""
                this.alert = true

            }).catch((error) => {
                console.error(error)
                this.errorMessage = "";
            });
        }
    }
}
</script>