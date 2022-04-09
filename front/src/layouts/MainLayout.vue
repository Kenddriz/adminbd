<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          Administrateur
        </q-toolbar-title>

        <q-space />
        {{menu[$route.name].label}}
        <q-space />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
       class="text-white"

      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            exact
            exact-active-class="bg-warning"
            class="GNL__drawer-item"
            v-ripple v-for="(link, index) in menu"
            :to="link.to" :key="index"
            clickable
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue'
import {useServices} from '../../src/graphql/service/services'

export default {
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    const search = ref('')

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      ...useServices(),
      leftDrawerOpen,
      search,
      menu: [
        { icon: 'supervisor_account', label: 'Utilisateurs', to: '/users' },
        { icon: 'work', label: 'Employés', to: '/employee' },
        { icon: 'view_in_ar', label: 'Synthèses', to: '/synthesis' },
        { icon: 'perm_contact_calendar', label: 'Audits', to: '/audits' },
      ],
      toggleLeftDrawer
    }
  }
}
</script>

<style lang="sass">
.GNL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
