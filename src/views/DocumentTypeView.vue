<template>
  <v-container id="dashboard-view" fluid tag="section">
    <v-row>
      <v-col cols="6">
        <v-row>
          <material-card color="orange" full-header>
            <v-btn color="green" dark @click="openAddDocumentTypeDialog">
                Add document type
              </v-btn>
            <v-card-text>
              <v-data-table :headers="headers" :items="items">
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon small @click="openDeleteDocumentTypeDialog(item.id)">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </material-card>
        </v-row>
      </v-col>
      <v-dialog v-model="deleteDocumentTypeDialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Delete a document type
          </v-card-title>

          <v-card-text>
            Do you really want to delete this document type?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDocumentTypeDialog = false">
              Cancel
            </v-btn>
            <v-btn color="red" text @click="confirmDeleteDocumentType">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addDocumentTypeDialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Add document type
          </v-card-title>

          <DocumentTypeForm v-if="addDocumentTypeDialog" />

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
import DocumentTypeForm from "@/components/DocumentTypeForm.vue";

export default {
  name: "DashboardView",
  data() {
    return {
      addDocumentTypeDialog: false,
      deleteDocumentTypeDialog: false,
      documentTypeId: null,
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id',
        },
        {
          sortable: false,
          text: 'Name',
          value: 'name',
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
    DocumentTypeForm
  },
  computed: {
    items() {
      return this.$store.state.document.documentType
    }
  },
  created() {
    this.getDocumentType(this.$store.state.auth.userToken);

  },
  methods: {
    ...mapActions(["deleteDocumentType", "getDocumentType"]),
    openAddDocumentTypeDialog() {
      this.documentTypeId = null;
      this.addDocumentTypeDialog = true;
    },
    openDeleteDocumentTypeDialog(id) {
      this.documentTypeId = id
      this.deleteDocumentTypeDialog = true
    },
    confirmDeleteDocumentType() {
      this.deleteDocumentTypeDialog = false

      this.deleteDocumentType({
        documentTypeId: this.documentTypeId,
        userToken: this.$store.state.auth.userToken
      }).then(() => {
        this.getDocumentType(this.$store.state.auth.userToken)
      });
    }
  }
}
</script>