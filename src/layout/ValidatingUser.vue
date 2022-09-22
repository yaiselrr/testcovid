<template>
    <div class="validator-container">
        <div class="loading-text">
            Cargando y validando los permisos de usuario
        </div>
        <div class="shield-icon">
            <b-icon-shield-lock
                scale="7"
                animation="throb"
            ></b-icon-shield-lock>
        </div>
    </div>
</template>

<script>
export default {
    name: "validating-user",
};
</script>

<style lang="scss" scoped>
.validator-container {
    width: 100vw;
    height: 100vh;
    background: #1fbeca;
}

.loading-text {
    color: white;
    position: absolute;
    top: 35%;
    left: 50%;
    margin-left: -140px;
    font-size: 1.3rem;
    max-width: 300px;
    text-align: center;
    text-transform: uppercase;
}

.shield-icon {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>