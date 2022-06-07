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

                    <v-col cols="12">
                        <v-file-input small-chips truncate-length="15" @change="selectFile"></v-file-input>
                    </v-col>

                    <v-col cols="12" v-if="medias">
                        <v-list dense nav>
                            <v-list-item v-for="media in medias" :key="media.id" link>

                                <v-list-item-icon>
                                    <v-icon>mdi-file-document-outline</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content @click="download(media)">

                                    <v-list-item-title>{{ sliceString(media.filePath) }}</v-list-item-title>

                                </v-list-item-content>

                            </v-list-item>

                        </v-list>
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
import axios from 'axios';
import MaterialCard from "@/components/MaterialCard";
import { mapActions } from "vuex";
import { saveAs } from 'file-saver';
export default {
    name: "DocumentForm",
    data() {
        return {
            errorMessage: "",
            title: "",
            description: "",
            documentType: "",
            progress: 0,
            currentFile: null,
            medias: []
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
                this.medias = response.data.medias
            });
        } else {
            this.title = "",
                this.description = "",
                this.documentType = ""
            this.media = [];
        }
    },
    methods: {
        ...mapActions(["getDocuments", "getDocument", "updateDocument"]),
        selectFile(file) {
            this.progress = 0;
            this.currentFile = file;
        },
        sliceString(value) {
            return value.substring(value.lastIndexOf("/") + 1)
        },
        download(media) {
            axios.get('document_media/' + media.id,
                {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.auth.userToken}`,

                    },
                    responseType: 'arraybuffer',
                }).then((response) => {
                    if (!response.data) {
                        return console.error('Empty stream');
                    }

                    saveAs(new Blob([response.data]), media.filePath);
                }).catch((error) => {
                    console.error(error)
                });
        },
        submit() {
            if (!this.documentId) {
                this.newDocument({
                    file: this.currentFile,
                    title: this.title,
                    description: this.description,
                    documentType: this.documentType,
                    userToken: this.$store.state.auth.userToken
                }
                ).then(() => {
                    this.$emit('closeDialog')

                }).catch((error) => {
                    console.error(error)
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
                    this.$emit('closeDialog')
                    this.getDocuments(this.$store.state.auth.userToken);

                }).catch((error) => {
                    console.error(error)
                });
            }
        },
        newDocument(value){
                let formData;

                if (!value.file) {
                    formData = JSON.stringify({
                        "title": value.title,
                        "description": value.description,
                        "documentType": value.documentType
                    });
                } else {
                    formData = new FormData();
                    formData.append("file", value.file);
                    formData.append("title", value.title);
                    formData.append("description", value.description);
                    formData.append("documentType", value.documentType);
                }

                axios.post('document',
                    formData,
                    {
                        headers: {
                            "Content-Type": value.file ? "multipart/form-data" : "application/json",
                            Authorization: `Bearer ${value.userToken}`
                        }
                    }).then(() => {
                        this.$emit('closeDialog')
                        this.getDocuments(this.$store.state.auth.userToken);
                    }).catch((error) => {
                        console.error(error)
                    });
            }
    }
}
</script>