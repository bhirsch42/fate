<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>FATE</span>
        <span class="font-weight-light">ADMIN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="/#/screen" target="_blank">
        <span class="mr-2">Open Screen</span>
      </v-btn>
    </v-toolbar>

   <v-dialog v-model="dialog" max-width="600px">
      <v-btn fixed dark fab bottom right slot="activator" color="primary">
        <font-awesome-icon icon="plus" />
      </v-btn>
      <CreateEntity @done="dialog = false" />
    </v-dialog>

    <v-content>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="entity in entities">
            <Entity :entity="entity"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Entity from '@/components/admin/Entity'
import CreateEntity from '@/components/admin/CreateEntity'

export default {
  components: {
    Entity,
    CreateEntity,
  },

  data() {
    return {
      dialog: false,
    }
  },

  apollo: {
    entities: {
      query: require('@/graphql/entity/read.gql'),
      subscribeToMore: {
        document: require('@/graphql/entity/created.gql'),
        updateQuery: ({ entities }, { subscriptionData: { data: { entityCreated } } }) => {
          entities.push(entityCreated);
        }
      },
    },
  },

  methods: {

  }
}
</script>

<style scoped>

</style>
