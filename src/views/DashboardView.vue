<template>
  <v-container id="dashboard-view" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-row>
          <material-card color="orange" full-header>
            <v-card-text>
              <v-btn color="green" dark @click="openAddDocumentDialog">
                Add document
              </v-btn>
              <v-dialog v-model="addDocumentDialog" width="500">
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    {{ documentId ? 'Edit' : 'Add' }} document
                  </v-card-title>

                  <DocumentForm v-if="addDocumentDialog" :documentId="documentId" @closeDialog="addDocumentDialog = false" />

                  <v-divider></v-divider>
                  <v-card-actions></v-card-actions>
                </v-card>
              </v-dialog>
              <v-data-table :headers="headers" :items="items">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon small class="mr-2" @click="openEditDocumentDialog(item.id)">mdi-pencil</v-icon>
                  <v-icon small @click="openDeleteDocumentDialog(item.id)">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-card-text>
            <v-dialog v-model="deleteDocumentDialog" width="500">
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Delete a document
                </v-card-title>

                <v-card-text>
                  Do you really want to delete this document?
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="deleteDocumentDialog = false">
                    Cancel
                  </v-btn>
                  <v-btn color="red" text @click="confirmDeleteDocument">
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </material-card>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import MaterialCard from "@/components/MaterialCard";
import DocumentForm from "@/components/DocumentForm.vue";

export default {
  name: "DashboardView",
  data() {
    return {
      addDocumentDialog: false,
      deleteDocumentDialog: false,
      documentId: null,
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id',
        },
        {
          sortable: false,
          text: 'Title',
          value: 'title',
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
    DocumentForm
  },
  created() {
    this.getDocumentType(this.$store.state.auth.userToken);
    this.getAllDocuments()
  },
  computed: {
    items() {
      return this.$store.state.document.documents
    }
  },
  methods: {
    ...mapActions(["getDocuments", "getDocumentType", "deleteDocument"]),
    getAllDocuments() {
      this.getDocuments(this.$store.state.auth.userToken);
    },
    openAddDocumentDialog() {
      this.documentId = null;
      this.addDocumentDialog = true;
    },
    openEditDocumentDialog(id) {
      this.documentId = id
      this.addDocumentDialog = true
    },
    openDeleteDocumentDialog(id) {
      this.documentId = id
      this.deleteDocumentDialog = true
    },
    confirmDeleteDocument() {
      this.deleteDocumentDialog = false

      this.deleteDocument({
        documentId: this.documentId,
        userToken: this.$store.state.auth.userToken
      }).then(() => {
        this.getAllDocuments()
      });
    }
  }
}
</script>