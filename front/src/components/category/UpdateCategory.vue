<template>
 <q-dialog ref="dialogRef"   header-class="bg-primary text-white"
      expand-icon-class="text-white">
    <div class="q-pa-md bg-white" >
    <div class="q-gutter-y-md column " style="max-width: 600px">

               <q-form

      class="q-gutter-md"

    >
      <q-input
        filled
        v-model="input.name"
        label="Your name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="text"
        v-model.number="input.slug"
        label="Slague"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />
      <div>
        <q-btn
        label="Enregistrer"
         @click="onOKClick"
         flat
         dense
         round
          />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
  </div>
 </q-dialog>

</template>
<script>
import { useDialogPluginComponent } from 'quasar'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    props: {
    name:String,
    slug: String
  },
  setup(props) {
      const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()
      const input = reactive({
        name: props.name,
        slug: props.slug
      });
    return{

          dialogRef,
            onOKClick () {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(input)
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },
      input,
      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,

    }
  },
})
</script>
