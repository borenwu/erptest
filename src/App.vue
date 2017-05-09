<template>
    <div id="app" class="wrapper">
      <main-header></main-header>
      <main-sidebar></main-sidebar>
      <content-wrapper></content-wrapper>
      <main-footer></main-footer>
      <control-sidebar></control-sidebar>
    </div>
</template>

<script>
  //  import Hello from '@/components/Hello.vue'
  import MainHeader from '@/components/mainheader/MainHeader.vue'
  import MainSidebar from  '@/components/mainsidebar/MainSidebar.vue'
  import MainFooter from '@/components/mainfooter/MainFooter.vue'
  import ContentWrapper from '@/components/contentwrapper/ContentWrapper.vue'
  import ControlSidebar from '@/components/controlsidebar/ControlSIdebar.vue'

  const appconfig = require('../static/config/config.json')
  const rootUrl = appconfig.rootUrl
  const id = appconfig.companyId
  const token = appconfig.companyToken
  const name = appconfig.companyName

  export default {
    name: 'app',
    components: {
      MainHeader,
      MainSidebar,
      ContentWrapper,
      MainFooter,
      ControlSidebar
    },
    methods:{
      setInit(){
        let store = this.$store
        let companyInfo = {
          companyName:name,
          companyId: id,
          token: token,
        }
        store.commit('SET_COMPANY', companyInfo)
        store.commit('SET_URL', rootUrl)
      }
    },
    created(){
      let vm = this;
      vm.setInit()
    }
  }
</script>

<style>

</style>
