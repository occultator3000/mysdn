import Router from 'vue-router'
import Vue from 'vue'
import store from '@/store'

import About from '@/components/About'
import Canvas from '@/components/Canvas'
import CanvasToolbar from '@/components/CanvasToolbar'
import Export from '@/components/Export'
import Home from '@/components/Home'
import MininetSettings from '@/components/MininetSettings'

Vue.use(Router)

function selectionTitleSuffix (ids) {
  if (!ids) {
    return ''
  }

  const length = ids.split(',').length
  return ` with ${length} selected item${length === 1 ? '' : 's'}`
}

const router = new Router({
  routes: [{
    path: '/',
    redirect: { name: 'Home' }
  }, {
    path: '/home',
    name: 'Home',
    meta: {
      title: 'Home'
    },
    component: Home
  }, {
    path: '/canvas/:ids?',
    name: 'Canvas',
    meta: {
      title (to) {
        return `Canvas${selectionTitleSuffix(to.params.ids)}`
      }
    },
    components: {
      default: Canvas,
      toolbar: CanvasToolbar
    }
  }, {
    path: '/canvas/:x/:y/:scale/:ids?',
    name: 'CanvasPosition',
    meta: {
      title (to) {
        const { x, y, scale, ids } = to.params
        return `Canvas at position ${x}\u{a0}×\u{a0}${y} scaled to ${(scale * 100).toFixed(0)}\u{a0}% ${selectionTitleSuffix(ids)}`
      }
    },
    components: {
      default: Canvas,
      toolbar: CanvasToolbar
    }
  }, {
    path: '/mininet_settings',
    name: 'MininetSettings',
    meta: {
      title: 'Mininet Settings'
    },
    component: MininetSettings
  }, {
    path: '/export',
    name: 'Export',
    meta: {
      title: 'Export/Import'
    },
    component: Export
  }, {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About'
    },
    component: About
  }]
})

router.beforeEach((to, from, next) => {
  store.commit('clearAlert')
  store.commit('setWorking', { working: false })
  next()
})

export default router
