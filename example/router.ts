import { createRouter, createWebHistory} from "vue-router"
import { createLayout } from "../src/index"
import Foo from "./Foo.vue"
import Bar from "./Bar.vue"
const {component:Layout} = createLayout({
  useRouter:true,
  sideBar:{
    component:Foo
  }
})

export const router = createRouter({
  history:createWebHistory(),
  routes:[{
    path:"/",
    component: Layout,
    children:[
      {
        path:"/bar",
        component: ()=>import("./Bar.vue")
      },
    ]
  }],
})

