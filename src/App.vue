<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
  @import './custom.css';

  @font-face {
    font-family: iconfont;
    src: url('./static/iconfont.ttf');
  }

</style>
