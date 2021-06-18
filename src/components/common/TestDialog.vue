<template>
    <div class="date-area">
        <dialog-base :value="value" @closeDialog="closeDialog" otherDialogClass="dateChoose">
            <div slot="body">
                <TestForm v-if="hackReset"></TestForm>
            </div>
        </dialog-base>
    </div>
</template>

<script>
import DialogBase from './BaseDialog.vue';
import TestForm from './TestForm.vue';
export default {
    data() {
        return {
            hackReset: false,
        };
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value() {
            if (this.value) {
                this.hackReset = false;
                this.$nextTick(() => {
                    this.hackReset = true;
                });
            }
        }
    },
    created() {},
    methods: {
        closeDialog() {
            this.$emit('input', false);
            this.$emit('closeDateChooseDialog');
        },
    },
    components: {
        DialogBase,
        TestForm
    }
};
</script>