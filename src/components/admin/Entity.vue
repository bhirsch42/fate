<template>

<v-card>
  <v-card-title>
    <div class="title font-weight-light">
      {{entity.name}}
    </div>
    <v-spacer></v-spacer>
    <v-chip>{{entity.type}}</v-chip>
  </v-card-title>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <v-btn icon slot="activator">
        <font-awesome-icon icon="eye" />
      </v-btn>
      <span>Focus</span>
    </v-tooltip>
    <v-dialog v-model="dialog" max-width="600px">
      <v-btn icon slot="activator">
        <font-awesome-icon icon="edit" />
      </v-btn>
      <CreateEntity :entity="entity" @done="dialog = false" />
    </v-dialog>
    <v-tooltip bottom>
      <v-btn icon slot="activator">
        <font-awesome-icon icon="archive" />
      </v-btn>
      <span>Archive</span>
    </v-tooltip>
  </v-card-actions>
</v-card>

</template>

<script>
import CreateEntity from '@/components/admin/CreateEntity'


export default {
  name: "Entity",
  props: ['entity'],

  components: {
    CreateEntity,
  },

  data() {
    return {
      dialog: false,
    }
  },
}


</script>
