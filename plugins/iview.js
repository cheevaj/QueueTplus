import Vue from 'vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import locale from 'view-design/dist/locale/en-US'
import dayjs from 'dayjs'

Vue.use(ViewUI, { locale })

dayjs.locale('en')
