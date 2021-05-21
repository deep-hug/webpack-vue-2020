<template>
    <div class="error-container">
        <div class="img-container"></div>
        <p class="error-tilte">无法访问此页面</p>
        <div class="error-desc">
            <p>请尝试以下方法：</p>
            <p>1、检查网络连接</p>
            <p>2、返回首页</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.error-container {
    height: 100%;
    background-color: #fff;
    overflow: hidden;
    padding-top: 100px;
    .img-container {
        margin: 0 auto;
        width: 577px;
        height: 337px;
        background: url('../assets/images/404.png') no-repeat;
        background-size: 100% 100%;
    }
    .error-tilte {
        text-align: center;
        margin-top: 30px;
        font-size: 30px;
        font-weight: 700;
    }
    .error-desc {
        width: 300px;
        line-height: 26px;
        margin: 20px auto;
        p:not(:first-child) {
            text-indent: 1em;
        }
    }
}
</style>
