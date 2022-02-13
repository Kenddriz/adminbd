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
        {{services.map(x => x.intitule).join('-')}}
        <q-space />


        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
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
        <q-list padding class="text-white-8">
          <q-item
            exact
            exact-active-class="text-white"
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
    const showAdvanced = ref(false)
    const showDateOptions = ref(false)
    const exactPhrase = ref('')
    const hasWords = ref('')
    const excludeWords = ref('')
    const byWebsite = ref('')
    const byDate = ref('Any time')

    function onClear () {
      exactPhrase.value = ''
      hasWords.value = ''
      excludeWords.value = ''
      byWebsite.value = ''
      byDate.value = 'Any time'
    }

    function changeDate (option: any) {
      byDate.value = option
      showDateOptions.value = false
    }

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      ...useServices(),
      leftDrawerOpen,
      search,
      showAdvanced,
      showDateOptions,
      exactPhrase,
      hasWords,
      excludeWords,
      byWebsite,
      byDate,

      menu: [
        { icon: 'supervisor_account', label: 'Utilisateurs', to: '/users' },
        { icon: 'work', label: 'Employés', to: '/employee' },
        { icon: 'view_in_ar', label: 'Synthères', to: '/synthesis' },
        { icon: 'perm_contact_calendar', label: 'Audits', to: '/employe' },
         { icon: 'home_repair_service', label: 'Services', to: '/services' },
      ],
      onClear,
      changeDate,
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
