<script>
export default {}
</script>

<template>
  <v-main class="fill-height">
    <!-- Provides the application the proper gutter -->
    <v-container fluid class="fill-height d-flex justify-center py-0 pl-16">
      <div class="text-h2 secondary--text font-weight-regular mx-16">
        {{ $appName }}
      </div>
      <v-sheet class="ml-16 pa-16" color="white" height="100%" width="650"
        ><slot
      /></v-sheet>
      <section class="sign-in-page">
        <div id="container-inside">
          <div id="circle-small" />
          <div id="circle-medium" />
          <div id="circle-large" />
          <div id="circle-xlarge" />
          <div id="circle-xxlarge" />
        </div>
      </section>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.sign-in-page {
  background: #8ab6c9;
  background: -moz-linear-gradient(-45deg, #b0d6e6 0%, #3d7d99 100%);
  background: -webkit-linear-gradient(-45deg, #b0d6e6 0%, #3d7d99 100%);
  background: linear-gradient(135deg, #b0d6e6 0%, #3d7d99 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#b0d6e6', endColorstr='#3d7d99', GradientType=1);
  position: fixed;
  z-index: -1;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  margin: 0px auto;
  padding: 0px auto;
  top: 0;
  left: 0;
}
#container-inside {
  position: relative;
  min-width: 960px;
  max-width: 1280px;
  height: auto;
  min-height: 100%;
  margin: 0px auto;
  padding: 0px auto;
  overflow: visible;
}
#circle-small {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 0s;
  position: absolute;
  top: 200px;
  left: -150px;
  background: #fff;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  opacity: 0.4;
}
#circle-medium {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 0.3s;
  position: absolute;
  top: 50px;
  left: -300px;
  background: #fff;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  opacity: 0.3;
}
#circle-large {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 0.6s;
  position: absolute;
  top: -100px;
  left: -450px;
  background: #fff;
  width: 900px;
  height: 900px;
  border-radius: 50%;
  opacity: 0.2;
}
#circle-xlarge {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 0.9s;
  position: absolute;
  top: -250px;
  left: -600px;
  background: #fff;
  width: 1200px;
  height: 1200px;
  border-radius: 50%;
  opacity: 0.1;
}
#circle-xxlarge {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 1.2s;
  position: absolute;
  top: -400px;
  left: -750px;
  background: #fff;
  width: 1500px;
  height: 1500px;
  border-radius: 50%;
  opacity: 0.05;
}
@-webkit-keyframes circle-small-scale {
  0% {
    -webkit-transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
  }
}
@keyframes circle-small-scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
