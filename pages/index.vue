<template>
  <div style="background-color: rgb(255, 255, 77); min-height: 91vh">
    <v-card-actions class="pt-2 pl-1 pr-6 pb-0">
      <v-card
        flat
        width="100%"
        class="py-2 px-0 text-center ml-12"
        style="background-color: transparent"
        ><h1 class="custom-font">{{ title }}</h1></v-card
      >
      <v-spacer />
      <v-btn
        fab
        small
        text
        :loading="loading"
        class="border-avatar custom-btn"
        style="background-color: rgb(255, 204, 0)"
        @click="refreshData"
        ><v-icon color="#ffff">mdi-refresh</v-icon></v-btn
      >
    </v-card-actions>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="6" class="pa-6">
        <v-card class="custom-card shadow-card" outlined>
          <div v-if="queues.length !== 0" class="stacked-cards">
            <v-card
              outlined
              class="text-center d-flex justify-center align-center custom-number-queue"
              width="35"
              height="35"
              ><h3>{{ queues.length }}</h3></v-card
            >
            <v-card
              v-for="(item, index) in queues"
              :key="index"
              outlined
              class="custom-queue border-card"
            >
              <v-card-actions class="px-4 py-0 color-queue">
                <div>
                  <v-avatar class="border-avatar">
                    <v-img
                      width="54"
                      height="54"
                      src="line-yellow-and-black.jpg"
                      alt="John"
                    >
                      <v-card
                        outlined
                        width="30"
                        height="30"
                        class="shadow-card-text"
                        style="
                          border-radius: 50%;
                          margin-top: 12px;
                          margin-left: 8px;
                          padding-top: 2px;
                        "
                        ><h2>{{ item.queuenumber }}</h2></v-card
                      >
                    </v-img>
                  </v-avatar>
                </div>
                <v-spacer></v-spacer>
                <div>
                  <v-card
                    outlined
                    width="230px"
                    height="34px"
                    class="custom-data mx-3 shadow-card-text text-center"
                    ><h2>{{ item.phonenumber }}</h2></v-card
                  >
                </div>
              </v-card-actions>
              <h4 class="text-center custom-font">
                ສາຂາ&nbsp;{{ item.branchid }}
              </h4>
              <v-divider></v-divider>
              <v-card-actions>
                <div>
                  <h4 class="text-center custom-font">ວັນທີ່ຈອງຄິວ</h4>
                  <v-card
                    outlined
                    width="161px"
                    height="30px"
                    class="custom-data shadow-card-text text-center"
                    style="padding-top: 4px"
                  >
                    {{ formatAdjustDate(item.createdAt, true) }}
                  </v-card>
                </div>
                <div>
                  <h4 class="text-center custom-font">ໝົດກຳໜົດ</h4>
                  <v-card
                    outlined
                    width="161px"
                    height="30px"
                    class="custom-data shadow-card-text text-center"
                    style="padding-top: 4px"
                  >
                    {{ formatAdjustDate(item.updatedAt, true) }}
                  </v-card>
                </div>
              </v-card-actions>
              <v-card-actions class="py-0 px-4">
                <div>
                  <h5 class="text-center custom-font">ເວລາຈອງຄິວ</h5>
                  {{ formatAdjustDate(item.updatedAt, false) }}
                </div>
                <v-spacer />
                <v-btn
                  outlined
                  small
                  :disabled="active"
                  class="text-color custom-btn"
                  style="background-color: rgb(255, 204, 0); height: 35px"
                  @click="useQueue(item, true)"
                  ><h2 class="custom-font">ທໍາທຸລະກຳ</h2></v-btn
                >
              </v-card-actions>
            </v-card>
          </div>
          <v-card
            flat
            v-else
            class="text-center d-flex justify-center align-center"
            height="250"
          >
            <v-card-text>
              <h2 class="custom-font">ຍັງບໍ່ມີຂໍ້ມູນ</h2>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="6" class="pa-6">
        <v-card class="custom-card shadow-card" outlined>
          <v-card
            v-if="Object.keys(usequeue).length !== 0"
            class="custom-card-queue border-card"
            outlined
          >
            <v-card-actions class="px-4 py-0 color-queue">
              <div>
                <v-avatar class="border-avatar">
                  <v-img
                    width="54"
                    height="54"
                    src="line-yellow-and-black.jpg"
                    alt="John"
                  >
                    <v-card
                      outlined
                      width="30"
                      height="30"
                      class="shadow-card-text"
                      style="
                        border-radius: 50%;
                        margin-top: 12px;
                        margin-left: 8px;
                        padding-top: 2px;
                      "
                      ><h2>{{ usequeue.queuenumber }}</h2></v-card
                    >
                  </v-img>
                </v-avatar>
              </div>
              <v-spacer />
              <div>
                <v-card
                  outlined
                  width="250px"
                  height="34px"
                  class="custom-data mx-3 shadow-card-text text-center"
                  ><h2>{{ usequeue.phonenumber }}</h2></v-card
                >
              </div>
              <v-spacer />
              <div>
                <h3 class="text-center custom-font text-center">
                  ສາຂາ&nbsp;{{ usequeue.branchid }}
                </h3>
              </div>
              <v-spacer />
            </v-card-actions>
            <div class="text-center">
              <h2>{{ formatAdjustDate(usequeue.updatedAt, true) }}</h2>
              <v-divider></v-divider>
            </div>
            <v-card-actions class="py-0 px-4">
              <div>
                <h4 class="text-center custom-font">ໃຊ້ເວລາທໍາງານ</h4>
                <v-card
                  outlined
                  width="85px"
                  height="85px"
                  class="custom-data shadow-card-text text-center d-flex justify-center align-center"
                  style="border-radius: 50%"
                >
                  <span style="color: rgb(230, 184, 0)"
                    >{{ formattedTime }}s</span
                  >
                </v-card>
              </div>
              <v-spacer />
              <div>
                <v-card-actions class="pa-0">
                  <v-spacer />
                  <h4 class="text-center custom-font">ວັນທີ່ຈອງຄິວ:&nbsp;</h4>
                  <v-card
                    outlined
                    width="161px"
                    height="30px"
                    class="custom-data shadow-card-text text-center"
                    style="padding-top: 4px"
                  >
                    {{ formatAdjustDate(usequeue.createdAt, true) }}
                  </v-card>
                </v-card-actions>
                <v-card-actions class="pa-0">
                  <v-spacer />
                  <h4 class="text-center custom-font">ເວລາຈອງຄິວ:&nbsp;</h4>
                  <v-card
                    outlined
                    width="161px"
                    height="30px"
                    class="custom-data shadow-card-text text-center"
                    style="padding-top: 4px"
                  >
                    {{ formatAdjustDate(usequeue.updatedAt, false) }}
                  </v-card>
                </v-card-actions>
              </div>
            </v-card-actions>
            <v-card-actions class="pa-0 px-4 py-0">
              <v-spacer />
              <v-card-actions class="pa-0">
                <v-btn
                  text
                  class="custom-btn"
                  style="background-color: #ff3300; color: #ffff"
                  @click="cancelQueue(usequeue)"
                  ><h3 class="custom-font">ບໍ່ມີຄິວ</h3></v-btn
                >
                &nbsp;
                <v-btn
                  text
                  class="custom-btn"
                  style="background-color: rgb(0, 204, 68); color: #ffff"
                  @click="successQueue(usequeue)"
                  ><h3 class="custom-font">ທໍາທຸລະກຳສໍາເລັດ</h3></v-btn
                >
              </v-card-actions>
            </v-card-actions>
          </v-card>
          <v-card
            flat
            v-else
            class="text-center d-flex justify-center align-center"
            height="250"
          >
            <v-card-text>
              <h2 class="custom-font">ຍັງບໍ່ມີຂໍ້ມູນ</h2>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-card-actions class="pl-4 py-0 pr-0">
      <v-spacer />
      <v-card flat width="140px" style="background-color: transparent">
        <h3 class="custom-font">ຈໍານອນຄິວຕົກຄັ້ງ</h3>
        <v-btn
          fab
          small
          :disabled="queuesnotsuccess.length === 0"
          text
          class="custom-btn"
          style="
            background-color: #ffff;
            color: #ff3300;
            border: 2px solid #bfbfbf;
            margin-left: 35px;
          "
          @click="modalTyple = true"
        >
          <h2>{{ queuesnotsuccess.length }}</h2>
        </v-btn>
      </v-card>
      <Modal
        v-model="modalTyple"
        draggable
        scrollable
        :mask="false"
        width="340"
        style="padding: 0px"
      >
        <template #header>
          <div style="color: rgb(255, 215, 0); text-align: center">
            <v-icon color="rgb(255, 215, 0)">mdi-format-list-checkbox</v-icon>
            <span class="custom-font">ຈໍານອນຄິວຕົກຄັ້ງ</span>
          </div>
        </template>
        <div>
          <div style="text-align: center">
            <v-card
              outlined
              class="table-container"
              style="
                max-height: 240px;
                z-index: 100;
                margin-top: 2px;
                overflow-y: auto;
              "
            >
              <div
                v-for="(item, index) in queuesnotsuccess"
                :key="index"
                :value="item"
                style="max-height: 100%; padding: 2px"
              >
                <v-card-text
                  class="custom-font"
                  height="120px"
                  :style="{
                    backgroundColor: index % 2 === 0 ? '#ffeecc' : '#f2f2f2',
                    padding: '2px',
                    margin: '0',
                  }"
                >
                  <v-card-actions>
                    <div>ຄິວທີ່:</div>
                    &nbsp;
                    <h3>{{ item.queuenumber }}</h3>
                    <v-spacer />
                    <v-btn
                      text
                      small
                      class="text-color custom-btn"
                      style="
                        background-color: transparent;
                        height: 35px;
                        color: #ff0000;
                      "
                      @click="cancelQueue(item)"
                      ><h3 class="custom-font">ບໍ່ມີຄິວ</h3>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      outlined
                      small
                      :disabled="active"
                      class="text-color custom-btn"
                      style="background-color: rgb(255, 204, 0); height: 35px"
                      @click="useQueue(item, false)"
                    >
                      <h3 class="custom-font">ດໍາເນີນຕໍ່</h3>
                    </v-btn>
                  </v-card-actions>
                </v-card-text>
                <v-divider></v-divider>
              </div>
            </v-card>
          </div>
        </div>
        <template #footer>
          <Button
            size="large"
            long
            style="background-color: #ff9900; color: #ffff"
            @click="modalTyple = !modalTyple"
          >
            <v-icon color="#ffff">mdi-close</v-icon>&nbsp;<span
              class="custom-font"
              >ປິດຈໍານອນຄິວຕົກຄັ້ງ</span
            >
          </Button>
        </template>
      </Modal>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  Currency: 'DefaultLayout',
  data() {
    return {
      queues: [],
      queuesnotsuccess: [],
      title: '',
      timeDifference: 0,
      loading: false,
      formattedTime: '00:00',
      active: false,
      modalTyple: false,
    }
  },
  computed: {
    queue() {
      return this.$store.state.queue
    },
    usequeue() {
      return this.$store.state.queue_use
    },
    tokenShow() {
      return this.$store.state.tokenShow
    },
    branchid() {
      return this.$auth.user.branchid
    },
    fistname() {
      return this.$auth.user.name
    },
  },
  mounted() {
    this.dataResponseAll()
  },
  methods: {
    refreshData() {
      this.loading = true
      this.dataResponseAll()
    },
    async successQueue(item) {
      this.$store.commit('SET_QUEUE_USE', {})
      this.calculateTimeDifference(false)
      this.queuesnotsuccess = this.queuesnotsuccess.filter(
        (queuesnotsuccess) => queuesnotsuccess.id !== item.id
      )
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:3600/monitor/successqueue',
          {
            phonenumber: item.phonenumber,
            branchid: item.branchid,
          }
        )
        console.log(response.statusText)
        this.messageModal('success', 'ທໍາທຸລະກຳສໍາເລັດເເລ້ວ')
      } catch (error) {
        console.error('Error fetching data:', error)
        this.messageModal('error', 'ທໍາທຸລະກຳບໍ່ສໍາເລັດເເລ້ວ')
      } finally {
        this.active = false
      }
    },
    async cancelQueue(item) {
      this.$store.commit('SET_QUEUE_USE', {})
      this.calculateTimeDifference(false)
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:3600/monitor/failqueue',
          {
            phonenumber: item.phonenumber,
            branchid: item.branchid,
          }
        )
        console.log(response.statusText)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.queuesnotsuccess = this.queuesnotsuccess
          ? this.queuesnotsuccess.filter(
              (queuesnotsuccess) => queuesnotsuccess.id !== item.id
            )
          : []
        this.active = false
      }
    },
    async useQueue(item, ati) {
      if (ati) {
        try {
          const response = await this.$axios
            .post('http://172.28.17.102:3600/monitor/employeeprocess', {
              phonenumber: item.phonenumber,
              employeeId: this.fistname,
              branchid: item.branchid,
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.status === 500) {
                  console.log('Server error: 500')
                } else if (error.response.status === 404) {
                  this.queues = this.queues
                    ? this.queues.filter((queue) => queue.id !== item.id)
                    : []
                  this.active = false
                  this.messageModal('warning', 'ມີຄົນຮັບຄິວແລ້ວ')
                } else {
                  console.log(`Error: ${error.response.status}`)
                }
              } else {
                console.error('Network error or no response:', error)
              }
              return null
            })
          this.active = true
          this.$store.commit('SET_QUEUE_USE', item)
          this.queues = this.queues
            ? this.queues.filter((queue) => queue.id !== item.id)
            : []
          console.log(response.statusText)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      } else {
        this.queuesnotsuccess = this.queuesnotsuccess
          ? this.queuesnotsuccess.filter(
              (queuesnotsuccess) => queuesnotsuccess.id !== item.id
            )
          : []
          this.$store.commit('SET_QUEUE_USE', item);
      }
      this.calculateTimeDifference(true)
      this.modalTyple = false
    },
    async dataResponseAll() {
      const apiCalls = [
        this.$axios.post('http://172.28.17.102:3600/monitor/queuebranch', {
          branchid: `${this.branchid}`,
        }),
        this.$axios
          .post('http://172.28.17.102:3600/monitor/allqueueworkbyemployee', {
            branchid: `${this.branchid}`,
            employeeid: this.fistname,
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 500) {
                console.log('Server error: 500')
              } else if (error.response.status === 404) {
                console.log('Endpoint not found: 404')
                return []
              } else {
                console.log(`Error: ${error.response.status}`)
              }
            } else {
              console.error('Network error or no response:', error)
            }
            return null
          }),
        this.$axios
          .post('http://172.28.17.102:3600/branch/findbranchbyid', {
            branchid: `${this.branchid}`,
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
        const [databranchid, queuesnotsuccess, title] = await Promise.all(
          apiCalls
        )
        if (queuesnotsuccess) {
          this.queuesnotsuccess =
            queuesnotsuccess && queuesnotsuccess.data
              ? queuesnotsuccess.data
              : []
        } else {
          console.log('Queue data not available')
          this.queuesnotsuccess = []
        }
        console.log('Branch:', this.fistname)
        this.queues = databranchid.data || []
        this.$store.commit('SET_QUEUE', this.queues)
        this.title = title.data.BNameL
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      this.loading = false
    },
    formatAdjustDate(dateString, activeDate) {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (activeDate) {
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      } else {
        return date.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }
    },
    calculateTimeDifference(startFromZero) {
      if (startFromZero) {
        this.startTimer()
      } else {
        this.timeDifference = 0
        this.formattedTime = '00:00'
        this.stopTimer()
      }
    },
    startTimer() {
      this.timeDifference = 0
      this.startTime = Date.now()
      this.timer = setInterval(() => {
        const currentTime = Date.now()
        this.timeDifference = Math.floor((currentTime - this.startTime) / 1000)
        this.formattedTime = this.formatTime(this.timeDifference)
      }, 500)
    },
    stopTimer() {
      clearInterval(this.timer)
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      const formattedMinutes = String(minutes).padStart(2, '0')
      const formattedSeconds = String(remainingSeconds).padStart(2, '0')
      return `${formattedMinutes}:${formattedSeconds}`
    },
    messageModal(type, content) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${content}</span>`,
      })
    },
  },
  beforeDestroy() {
    this.stopTimer()
  },
}
</script>

<style scoped>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.stacked-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-queue {
  position: absolute;
  width: 340px;
  height: 200px;
  background-color: #ffff4d;
  left: 0;
  top: 0;
  transform: translateY(15px) translateX(110px);
}
.border-card {
  border: 1px solid rgb(96, 96, 96);
}
.custom-card-queue {
  background-color: #ffff4d;
  color: #000;
  height: 250px;
}
.custom-queue:nth-child(1) {
  z-index: 9;
  transform: translateY(0px) translateX(110px);
}

.custom-queue:nth-child(2) {
  z-index: 8;
  transform: translateY(5px) translateX(100px);
}

.custom-queue:nth-child(3) {
  z-index: 7;
  transform: translateY(10px) translateX(90px);
}

.custom-queue:nth-child(4) {
  z-index: 6;
  transform: translateY(15px) translateX(80px);
}

.custom-queue:nth-child(5) {
  z-index: 5;
  transform: translateY(20px) translateX(70px);
}

.custom-queue:nth-child(6) {
  z-index: 4;
  transform: translateY(25px) translateX(60px);
}

.custom-queue:nth-child(7) {
  z-index: 3;
  transform: translateY(30px) translateX(50px);
}
.custom-queue:nth-child(8) {
  z-index: 2;
  transform: translateY(35px) translateX(40px);
}
.custom-queue:nth-child(9) {
  z-index: 1;
  transform: translateY(40px) translateX(30px);
}
.custom-queue:nth-child(n + 10) {
  z-index: 0;
  transform: translateY(45px) translateX(20px);
}
.custom-card {
  border: 1px solid rgb(166, 166, 166);
  border-radius: 4px;
  padding: 16px;
  height: 280px;
}
.color-queue {
  background-color: rgb(38, 38, 38);
  color: #ffff;
  height: 60px;
}
.custom-data {
  padding-left: 8px;
  background-color: #ffff;
  color: #000;
}
.border-avatar {
  border: 1px solid #d5d5d5;
}
.shadow-card {
  box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.5);
}
.shadow-card-text {
  box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.5);
}
.custom-number-queue {
  position: absolute;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  border: 2px solid #bfbfbf;
  background-color: #f2f2f2;
  color: #8c8c8c;
}
.text-color {
  color: #ffff;
  border: 1px solid #8c8c8c;
}
.text-color:hover {
  color: #000;
}
.custom-btn:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  outline: 2px solid rgb(179, 179, 0);
}
.custom-slide {
  transition: box-shadow 0.3s ease;
  outline: 0px solid #f2f2f2;
}
.table-container {
  scrollbar-width: thin;
  scrollbar-color: rgb(255, 215, 0) #ffffff;
}
</style>
