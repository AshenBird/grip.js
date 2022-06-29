import { createRouter, createWebHistory} from "vue-router"
// import { createLayout } from "../dist/es"
import { createLayout } from "../src"
import Foo from "./Foo.vue"
import Bar from "./Bar.vue"
import Baz from "./Baz.vue"
const {component:Layout} = createLayout({
  // useRouter:true,
  sideBar:{
    component:Foo
  }
})

export const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
    path:"/",
    component: Baz
  },
    // {
    // path:"/",
    // component: Layout,
    // children:[
    //   {
    //     path:"/bar",
    //     component: ()=>import("./Bar.vue")
    //   },
    // ]
  // }
],
})

