<template>
  <v-app dark>
    <div class="text-center">
      <div v-if="fname !== '' || token">
        <v-navigation-drawer
          v-model="drawer"
          :mini-variant="miniVariant"
          clipped
          fixed
          app
          style="
            background-color: #000;
            height: 91vh;
            border: 2px solid #ffcc00;
          "
        >
          <v-card-actions class="pa-0">
            &nbsp;&nbsp;
            <v-avatar
              height="64"
              width="58"
              class="pa-0 black custom-moues"
              @click.stop="miniVariant = !miniVariant"
            >
              <img src="Tpluslogo.png" alt="John" />
            </v-avatar>
            <h2
              class="custom-font"
              style="color: #ffff; padding-left: 8px; padding-right: 8px"
            >
              <v-card-actions class="pa-0">
                ສາຂາ&nbsp;
                <v-card class="pa-2" style="background-color: #000; overflow: hidden">
                  <div
                    class="marquee-text"
                    style="
                      color: #ffcc00;
                      display: inline-block;
                      white-space: nowrap;
                    "
                  >
                    {{ title }}
                  </div>
                </v-card>
                &nbsp;
              </v-card-actions>
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
              v-for="(item, i) in filteredItems"
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
      <v-overlay :value="rightDrawer" />
      <v-navigation-drawer
        v-model="rightDrawer"
        right
        fixed
        width="350"
        class="table-container"
        style="background-color: rgb(242, 242, 242)"
        @click.stop
      >
        <v-card
          outlined
          class="py-0 px-3 rounded-0"
          style="position: fixed; z-index: 100; width: 100%"
        >
          <v-card-actions class="pa-0">
            <v-icon class="color-hover" @click="colsedraw"> mdi-close </v-icon>
            <v-card-title class="custom-font py-1">ເລືອກເເຂວງ</v-card-title>
          </v-card-actions>
        </v-card>
        <Menu
          style="margin-top: 42px; margin-left: 2px; width: 350px"
          @on-select="changeProvince"
        >
          <Submenu
            v-for="(item, index) in dataprovince"
            :key="index"
            :name="item.id"
          >
            <template #title>
              <h3
                class="custom-font"
                @click="provinceBranch(item.province, item.id)"
              >
                {{ item.province }}
              </h3>
            </template>
            <MenuItem
              v-for="(pvitem, index) in provincetplus[item.id] || []"
              :key="index"
              :name="pvitem.id"
              class="custom-font"
            >
              {{ pvitem.BNameL }}
            </MenuItem>
          </Submenu>
        </Menu>
      </v-navigation-drawer>
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
      dataprovince: [],
      provincetplus: {},
      rightDrawer: false,
      dialog: false,
      drawer: true,
      selectedItem: 0,
      items: [
        {
          icon: 'mdi-home',
          title: 'ໜ້າຫຼັກ',
          to: '/',
        },
        {
          icon: 'mdi-menu',
          title: 'ເລືອກເເຂວງ',
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
    branch() {
      const status =
        (this.$auth.user.name === 'chivang' ||
          this.$auth.user.name === 'khamlai') &&
        this.$auth.user.branchid === 1
      return status
    },
    filteredItems() {
      return this.items.filter((item, i) => !(i === 1 && !this.branch))
    },
    admin() {
      return this.$store.state.branch_id
    },
    title() {
      return this.$store.state.title
    },
  },
  mounted() {
    this.province()
  },
  methods: {
    changeProvince(name) {
      this.$store.commit('SET_BRANCH', name)
      this.dataResponseAll(name)
      this.colsedraw()
    },
    colsedraw() {
      this.selectedItem = 0
      this.rightDrawer = false
    },
    async provinceBranch(name, id) {
      if (this.provincetplus[id]) {
        return
      }
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:3600/branch/findbranchbyprovince',
          {
            province: name,
          }
        )
        this.$set(this.provincetplus, id, response.data)
        console.log(this.provincetplus)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async province() {
      try {
        const response = await this.$axios
          .post('http://172.28.17.102:3600/branch/findallbranch')
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 500) {
                console.log('Server error: 500')
                return []
              } else if (error.response.status === 404) {
                return []
              } else {
                console.log(`Error: ${error.response.status}`)
              }
            } else {
              console.error('Network error or no response:', error)
            }
            return null
          })
        this.dataprovince = response.data ? response.data : []
        console.log(this.dataprovince)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async dataResponseAll(id) {
      const apiCalls = [
        this.$axios.post('http://172.28.17.102:3600/monitor/queuebranch', {
          branchid: id,
        }),
        this.$axios
          .post('http://172.28.17.102:3600/branch/findbranchbyid', {
            branchid: id,
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 500) {
                console.log('Server error: 500')
              } else if (error.response.status === 404) {
                console.log('Endpoint not found: 404')
                return 'ສູນບໍລິການຂອງ Tplus'
              } else {
                console.log(`Error: ${error.response.status}`)
              }
            } else {
              console.error('Network error or no response:', error)
            }
            return null
          }),
      ]
      try {
        const [databranchid, title] = await Promise.all(apiCalls)
        const queues = databranchid.data || []
        this.$store.commit('SET_QUEUE', queues)
        const Title = title.data.BNameL
        this.$store.commit('SET_TITLE', Title);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    selectItem(index) {
      this.selectedItem = index
      if (index === 1) {
        this.rightDrawer = true
      }
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
.custom-moues:hover {
  cursor: pointer;
}
.table-container ::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}

.table-container ::-webkit-scrollbar-thumb {
  background-color: rgb(255, 215, 0);
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: #ffff00;
  border-radius: 4px;
}
.marquee-text {
  display: inline-block;
  white-space: nowrap;
  animation: scroll-left 10s linear infinite;
}

@keyframes scroll-left {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

.marquee-text:hover {
  animation-play-state: paused;
}
</style>
