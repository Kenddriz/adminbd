<template>
  <q-table
    class="my-sticky-header-table q-ma-md"
    title="Tous audits"
    :rows="audits"
    :columns="columns"
    row-key="id"
    flat
    bordered
    rows-per-page-label="Audits par page"
    :pagination-label="paginationLabel"
  />
</template>


<script lang="ts">
  import {defineComponent, onMounted, ref} from 'vue';
import {useAudits} from 'src/graphql/audit/audits';

export default defineComponent({
  name: 'Synthesis',
  setup() {
    const { loading, loadData, columns, audits } = useAudits();
    onMounted(() => {
      loadData();
    })
    return {
      filter: ref(''),
      columns,
      loading,
      audits,
      paginationLabel: (first: number, end: number, total: number) => `${first} - ${end} de ${total}`,
    }
  }
})
</script>

<style lang="sass">
  .my-sticky-header-table
    /* height or max-height is important */
    height: calc(100vh - 90px)

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      /* bg color is important for th; just specify one */
      background-color: #c1f4cd

    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0

    /* this is when the loading indicator appears */
    &.q-table--loading thead tr:last-child th
      /* height of all previous header rows */
      top: 48px
</style>
