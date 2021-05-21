<template>
    <div class="dialog" v-if="show">
        <div class="loading" v-if="type == 1">
            <div class="loading-container">
                <div class="loading-box"></div>
                <p class="loading-text">{{dialogStr}}</p>
            </div>
        </div>
        <div class="toast" v-if="type == 2">
            <div class="toast-box">
                <p>{{dialogStr}}</p>
            </div>
        </div>
        <div class="alert-dialog" @touchmove.prevent v-if="type == 3">
            <div class="dialog-bg"></div>
            <div class="alert-container">
                <div class="alert-title" v-if="dialogTitle">{{dialogTitle}}</div>
                <div class="alert-text">{{dialogStr}}</div>
                <div class="alert-btns">
                    <button type="button" @click="show=false;cancelFn()" v-if="cancelBtnStr">{{cancelBtnStr}}</button>
                    <button type="button" @click="show=false;okFn()" v-if="okBtnStr">{{okBtnStr}}</button></div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.dialog {
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0);
    z-index:100;
}
.loading {
    width:100%;
    height:100%;
    background:rgba(18, 18, 18, 0.6);
    .loading-container {
        min-height:0.8rem;
        min-width:0.8rem;
        padding: 10px 19px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color:#fff;
        border-radius:5px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        z-index: 999;
        .loading-box {
            background: transparent url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E") no-repeat;
            margin: 0 auto;
            width: 60px;
            height: 60px;
            animation: e 1s steps(12) infinite;
            background-size: contain;
        }
        .loading-text {
            font-size: 14px;
            text-align: center;
        }
    }
}
.toast {
    position: absolute;
    top:10px;
    font-size:16px;
    left:50%;
    transform:translate(-50%);
    z-index:999;
    .toast-box {
        padding: 10px 15px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 5px;
        word-break: break-word;
        color: #fff;
    }
}
.alert-dialog {
    width: 100%;
    height: 100%;
    .dialog-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .alert-container {
        position: absolute;
        min-width: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        z-index: 999;
        border-radius: 5px;
        overflow: hidden;
        .alert-title {
            line-height: 24px;
            font-size: 18px;
            color: #303133;
            padding: 20px 20px 10px;
        }
        .alert-text {
            padding: 30px 20px;
            color: #606266;
            font-size: 14px;
            word-break: break-all;
        }
        .alert-btns {
            width: 100%;
            padding: 10px 20px 20px;
            text-align: right;
            box-sizing: border-box;
            button {
                display: inline-block;
                flex: 1;
                border: none;
                font-size: 0.14rem;
                background-color: #fff;
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                background: #fff;
                border: 1px solid #dcdfe6;
                color: #606266;
                -webkit-appearance: none;
                text-align: center;
                box-sizing: border-box;
                outline: none;
                margin: 0;
                transition: .1s;
                font-weight: 500;
                // -moz-user-select: none;
                // -webkit-user-select: none;
                // -ms-user-select: none;
                padding: 12px 20px;
                font-size: 14px;
                border-radius: 4px;
                &:first-child {
                    background: #fff;
                    border: 1px solid #dcdfe6;
                    color: #606266;
                    margin-right: 10px;
                    &:hover{
                        color: #409eff;
                        border-color: #c6e2ff;
                        background-color: #ecf5ff;
                    }
                }
                &:nth-child(2) {
                    color: #fff;
                    background-color: #409eff;
                    border-color: #409eff;
                    margin-left: 10px;
                    &:hover{
                        background: #66b1ff;
                        border-color: #66b1ff;
                        color: #fff;
                    }
                }
            }
        }
        
    }
}
@keyframes e {
    0% {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(1turn);
    }
}
</style>