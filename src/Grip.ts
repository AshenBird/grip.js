import { defineComponent, UnwrapNestedRefs } from 'vue'

export declare namespace Grip{

  export interface CreateSideBarOptions {
    collapsedWidth?:number,
    component?: ReturnType<typeof defineComponent>,
    // 侧边栏是否可调节宽度
    resizable?:boolean
  }
  export interface SideBarOptions extends Required<CreateSideBarOptions> {}
  export interface CreateHeadBarOptions{
    component?: ReturnType<typeof defineComponent>,
    height?:number|string,
  }

  export interface HeadBarOptions extends Required<CreateHeadBarOptions> {}
  export interface CreateLayoutOptions{
    [key:string]:unknown
    // useRouter?:boolean
    headBar?:CreateHeadBarOptions
    sideBar?:CreateSideBarOptions
  }


  export interface LayoutOptions {
    [key:string]:unknown
    // useRouter:boolean
    headBar:HeadBarOptions
    sideBar:SideBarOptions
  }
  export interface StoreRaw {
    collapsed:boolean
    content:{
      height:number
    }
    sideBar:{
      width:[number,number]
    }
  }
  export type Store = UnwrapNestedRefs<StoreRaw>
  export type SetStore = (store:Store)=>void;
  export type InnerOption = {
    refresh:(...args:any[])=>any
  };
}