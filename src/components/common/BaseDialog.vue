<template>
    <div class="base-dialog" :class="[otherDialogClass ? otherDialogClass : '']">
        <el-dialog :modal-append-to-body="false" :visible.sync="dialogTableVisible" :modal="isNoModel" @close="closeDialog" >
            <header>
                <slot name="header"></slot>
            </header>
            <div class="body">
                <slot name="body"></slot>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'BaseDialog',
    data() {
        return {
            dialogTableVisible: false,
        };
    },
    props: {
        value:{
            type: Boolean,
            default:false,
        },
        otherDialogClass: {
            type: String,
            default: '',
        },
        isNoModel:{
            type: Boolean,
            default:true,
        }
    },
    watch : {
        value() {
            this.dialogTableVisible = this.value;
        }
    },
    mounted() {

    },
    methods: {
        /**
         * 关闭弹窗
         */
        closeDialog() {
            this.$emit('closeDialog');
        },
        
    },
};
</script>