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
    <v-tooltip bottom v-if="entity.archived">
      <v-btn icon slot="activator" @click="unarchiveEntity(entity)">
        <font-awesome-icon icon="archive" />
      </v-btn>
      <span>Unarchive</span>
    </v-tooltip>
    <v-tooltip bottom v-else>
      <v-btn icon slot="activator" @click="archiveEntity(entity)">
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

  methods: {
    archiveEntity(entity) {
      this.$apollo.mutate({
        mutation: require('@/graphql/entity/update.gql'),
        variables: { id: entity.id, input: { archived: true } },
      });
    },

    unarchiveEntity(entity) {
      this.$apollo.mutate({
        mutation: require('@/graphql/entity/update.gql'),
        variables: { id: entity.id, input: { archived: false } },
      });
    }
  }
}


</script>
