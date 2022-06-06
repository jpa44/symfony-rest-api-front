<template>
    <material-card color="primary">
        <v-form>
            <v-container class="py-0">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field color="purple" label="Title" v-model="title" />
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-select v-model="documentType" :items="documentTypes" item-value="id" item-text="name"
                            label="Document Type"></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-textarea color="purple" label="Description" v-model="description" />
                    </v-col>

                    <v-col cols="12" class="text-right">
                        <v-btn color="primary" min-width="150" @click="submit">
                            {{ documentId ? 'Edit' : 'Add' }} document
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
    name: "DocumentForm",
    data() {
        return {
            errorMessage: "",
            title: "",
            description: "",
            documentType: ""
        }
    },
    props: {
        documentId: Number
    },
    components: {
        MaterialCard,
    },
    computed: {
        documentTypes() {
            return this.$store.state.document.documentType
        }
    },
    created() {
        if (this.documentId) {
            this.getDocument({
                documentId: this.documentId,
                userToken: this.$store.state.auth.userToken
            }).then((response) => {
                this.title = response.data.title
                this.description = response.data.description
                this.documentType = response.data.type.id
            });
        } else {
            this.title = "",
                this.description = "",
                this.documentType = ""
        }
    },
    methods: {
        ...mapActions(["newDocument", "getDocument", "updateDocument"]),
        submit() {
            if (!this.documentId) {
                this.newDocument({
                    title: this.title,
                    description: this.description,
                    documentType: this.documentType,
                    userToken: this.$store.state.auth.userToken
                }
                ).then(() => {
                    this.errorMessage = "";

                }).catch((error) => {
                    console.error(error)
                    this.errorMessage = "";
                });
            } else {
                this.updateDocument({
                    documentId: this.documentId,
                    title: this.title,
                    description: this.description,
                    documentType: this.documentType,
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
}
</script>