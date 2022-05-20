import Layout from "./components/Layout.vue";
import { defineComponent, provide, reactive, toRaw, watch, App } from "vue";
import { OPTIONS, SET_STORE, STORE } from "./Symbols";

function assign<T extends Record<string, unknown>>(
  raw: T,
  base: Required<T>
): Required<T> {
  const result = Object.assign({}, base);
  for (const [k, v] of Object.entries(base)) {
    if (!raw[k]) continue;
    if (typeof v !== "object" || k === "component") {
      // @ts-ignore
      result[k] = raw[k];
      continue;
    }
    // @ts-ignore
    result[k] = assign(raw[k], v);
  }
  return result;
}

const defaultOptions = (raw: Grip.CreateLayoutOptions = {}) => {
  return assign<Grip.CreateLayoutOptions>(raw, {
    // useRouter: true,
    headBar: {
      component: defineComponent(() => () => <div></div>),
      height: "54px",
    },
    sideBar: {
      component: defineComponent(() => () => <div></div>),
      collapsedWidth: 0,
      resizable: true,
    },
  });
};

export const createLayout = (optionsRaw?: Grip.CreateLayoutOptions) => {
  const options = defaultOptions(optionsRaw);
  const STORE_KEY = "__GRIP_LAYOUT_STORE";
  const getStore = () => {
    const o = localStorage.getItem(STORE_KEY);
    if (o) {
      return JSON.parse(o);
    }
    return {
      sideBar: {
        width: [25, 100],
      },
      collapsed: false,
    };
  };
  const setStore = (s: Grip.Store) =>
    localStorage.setItem(STORE_KEY, JSON.stringify(toRaw(s)));

  const store = reactive<Grip.StoreRaw>(getStore());

  watch(
    store,
    (n) => {
      setStore(n);
    },
    {
      deep: true,
    }
  );

  return {
    useLayout: () => {
      return {
        options,
        store,
      };
    },
    component: defineComponent((props, ctx) => {
      if (options) {
        provide(OPTIONS, options);
        provide(STORE, store);
        provide(SET_STORE, setStore);
      }
      const slots = {
        head: ctx.slots["head"],
        side: ctx.slots["side"],
        default: ctx.slots["default"],
      }
      return () => (
        <>
          <Layout
            v-slots={slots}
          ></Layout>
        </>
      );
    }),
    install(app: App) {
      app.config.globalProperties.$grip = {
        getOptions: () => options,
        getStore: () => store,
      };
    },
  };
};
