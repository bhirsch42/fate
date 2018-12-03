<template>
<v-form v-on:submit.prevent="saveEntity(fields)">
  <v-card>
    <v-card-title>
      <span class="headline">Create New Card</span>
    </v-card-title>

    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex>
            <v-autocomplete v-model="fields.type" :items="entityTypes" label="Type"></v-autocomplete>
          </v-flex>
          <v-flex>
            <v-text-field v-model="fields.name" label="Name" autofocus></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn flat type="button" @click="cancel">cancel</v-btn>
      <v-btn flat type="submit">submit</v-btn>
    </v-card-actions>
  </v-card>
</v-form>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['entity'],

  data() {
    return {
      entityTypes: ['PC', 'NPC', 'Location', 'Ship'],
    };
  },

  computed: {
    fields() {
      return _.merge({
        name: '',
        type: 'NPC',
      }, this.entity ? this.entity : {});
    }
  },

  methods: {
    cancel() {
      this.$emit('done');
      this.$emit('canceled');
    },

    saveEntity(entity) {
      let input = {
        type: entity.type,
        name: entity.name,
      };

      this.$apollo.mutate(entity.id ? {
        mutation: require('@/graphql/entity/update.gql'),
        variables: { id: entity.id, input },
      } : {
        mutation: require('@/graphql/entity/create.gql'),
        variables: { input },
      }).then(data => {
        this.$emit('done', data);
        this.$emit('saved', data);
      });
    }
  }
}
</script>
