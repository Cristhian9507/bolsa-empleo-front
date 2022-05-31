<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col
          cols="4"
          md="4"
        >
          <v-btn
            color="primary"
            outlined
            @click="crearUsuario"
          >
            Crear usuario
          </v-btn>
        </v-col>
        <v-col
          cols="8"
          md="8"
        >
          <v-text-field
            v-model="search"
            :append-icon="icons.mdiMagnify"
            label="Buscar"
            single-line
            hide-details
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- Table -->
    <v-data-table
      :key="tableKey"
      :headers="headers"
      :items="codificaciones"
      :search="search"
      :items-per-page="10"
      class="table-kitchen-sink"
    >
      <!-- product -->
      <template #[`item.id`]="{item}">
        <span class="text-no-wrap">{{ item.id }}</span>
      </template>
      <template #[`nombre`]="{item}">
        <span class="text-no-wrap">{{ item.first_name }}</span>
      </template>
      <!-- category -->
      <template #[`item.edad`]="{item}">
        <span class="text-no-wrap">{{ item.edad }}</span>
      </template>
      <!-- buyer -->
      <template #[`item.email`]="{item}">
        <span class="text-no-wrap">{{ item.email }}</span>
      </template>
    </v-data-table>
    <v-dialog
      v-model="isDialogVisible"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Perfil de usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="usuario.first_name"
                  label="Nombre(s)*"
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="usuario.apellidos"
                  label="Apellido(s)*"
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="usuario.email"
                  label="Email*"
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="usuario.edad"
                  dense
                  label="Edad*"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            outlined
            @click="isDialogVisible = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="success"
            @click="guardar(), isDialogVisible = false"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from '@vue/composition-api'
import {
  mdiMagnify,
  mdiDeleteOutline,
  mdiEye,
  mdiRocketLaunch,
} from '@mdi/js'

export default {
  data() {
    return {
      personaId: this.$route.params.itemId,
      situacionLaboral: null,
      tableKey: 0,
    }
  },
  setup() {
    const search = ref('')
    const codificaciones = ref([])
    const isDialogVisible = ref(false)
    const usuario = ref({})

    return {
      icons: {
        mdiMagnify,
        mdiDeleteOutline,
        mdiEye,
        mdiRocketLaunch,
      },
      isDialogVisible,
      search,
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Nombre', value: 'first_name' },
        { text: 'Edad', value: '' },
        { text: 'Email', value: 'email' },
      ],
      codificaciones,
      usuario,
    }
  },
  created() {
    axios.get('users?page=1').then(res => {
      this.codificaciones = res.data.data
      localStorage.setItem('codificaciones', JSON.stringify(res.data.data))
    })
      .catch(res => {
        this.$swal({
          title: '¡Error!',
          text: 'Ocurrió un error tratando de obtener la información. Intente más tarde',
          icon: 'error',
        })
        this.errores = res
      })
  },
  methods: {
    crearUsuario() {
      this.isDialogVisible = true
    },
    guardar() {
      if (this.usuario.first_name !== null && this.usuario.apellidos !== null && this.usuario.email !== null && this.usuario.edad !== null) {
        this.usuario.id = this.codificaciones[this.codificaciones.length - 1].id + 1
        this.codificaciones.push(this.usuario)
        console.log(this.codificaciones)
        this.usuario = {}

        // this.usuario.id = null
        // this.usuario.first_name = null
        // this.usuario.apellidos = null
        // this.usuario.email = null
        // this.usuario.edad = null
        this.tableKey += 1
        this.$swal({
          title: 'Éxito!',
          text: 'El usuario se guardó correctamente',
          icon: 'success',
        })
      } else {
        this.$swal({
          title: '¡Error!',
          text: 'Todos los campos son obligatorios.',
          icon: 'error',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.table-kitchen-sink ::v-deep {
  .v-data-table-header {
    white-space: nowrap;
  }
}
</style>
