<template>
  <v-app dark>
    <div v-if="(fname !== '') || (token)">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        clipped
        fixed
        app
        style="background-color: #000; height: 91vh; border: 2px solid #ffcc00"
      >
        <v-card-actions class="pa-0">
          &nbsp;&nbsp;
          <v-avatar height="64" width="58" class="pa-0 black">
            <img src="Tpluslogo.png" alt="John" />
          </v-avatar>
          <h2
            class="custom-font"
            style="color: #ffff; padding-left: 20px; padding-right: 20px"
          >
            ສາຂາ&nbsp;<span style="color: #ffcc00">{{ branchid }}</span>
          </h2>
        </v-card-actions>
        <v-list
          class="shadow-card"
          style="
            background-color: #ffff;
            height: 45vh;
            margin-left: 1px;
            margin-right: 1px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            padding-top: 2px;
            box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.5);
          "
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            style="
              margin-left: 1px;
              margin-right: 1px;
              box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.5);
            "
            :style="{
              backgroundColor: selectedItem === i ? '#ffcc00' : 'transparent',
              color: selectedItem === i ? '#ffff' : '#000',
            }"
            @click="selectItem(i)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="custom-font">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="300">
        <v-card class="text-center">
          <v-icon class="mt-4" color="yellow" size="55"
            >mdi-alert-circle-outline</v-icon
          >
          <v-card-text class="text-h8 a text-center">
            <h4 class="custom-font">ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ?</h4>
            <p class="custom-font">
              ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກຈາກລະບົບ?
              ຂໍ້ມູນທັງຫມົດທີ່ບໍ່ໄດ້ບັນທຶກໄວ້ຂອງທ່ານຈະສູນເສຍ.
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn
                class="custom-font"
                color="error"
                text
                @click="dialog = false"
              >
                ຍົກເລີກ
              </v-btn>
              <v-btn class="custom-font" color="yellow" @click="logOut">
                ອອກຈາກລະບົບ
              </v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-app-bar
      clipped-left
      fixed
      app
      style="background-color: rgb(255, 225, 0)"
    >
      <div>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon size="30">mdi-menu</v-icon>
        </v-btn>
        &nbsp;&nbsp;
        <v-avatar height="48" width="48" class="pa-0 black">
          <img src="Tpluslogo.png" alt="John" />
        </v-avatar>
        <v-btn
          height="100%"
          class="pa-0 pl-12"
          text
          style="
            background-color: transparent;
            color: transparent;
            position: absolute;
            right: 18px;
            top: 2px;
          "
          @click="dialog = true"
        >
          <Tooltip width="200" class="custom-font" content="ອອກຈາກລະບົບ.">
            <v-card-actions class="pa-0 custom-btn"
              ><v-icon size="34">mdi-exit-to-app</v-icon></v-card-actions
            >
          </Tooltip>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      dialog: false,
      drawer: false,
      selectedItem: 0,
      items: [
        {
          icon: 'mdi-home',
          title: 'ໜ້າຫຼັກ',
          to: '/',
        },
      ],
      miniVariant: false,
    }
  },
  computed: {
    token() {
      if (this.$route.path === '/login') {
        return false
      } else {
        return true
      }
    },
    tokenShow() {
      return this.$store.state.tokenShow
    },
    fname() {
      return this.$auth.user && this.$auth.user.name ? this.$auth.user.name : ''
    },
    branchid() {
      return this.$auth.user && this.$auth.user.branchid
        ? this.$auth.user.branchid
        : 0
    },
  },
  methods: {
    selectItem(index) {
      this.selectedItem = index
    },
    logOut() {
      this.dialog = false
      this.$auth.strategy.token.reset()
      this.$store.commit('setToken', false)
      this.$router.push('/login')
      this.$auth.logout()
    },
  },
}
</script>

<style scoped>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.custom-btn {
  color: #000;
}
.custom-btn:hover {
  color: #ffff;
}
</style>
