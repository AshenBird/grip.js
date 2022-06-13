import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NLoadingBarProvider,
  NNotificationProvider,
} from "naive-ui";

import { darkTheme } from "naive-ui";
import { h, Fragment, computed, defineComponent } from "vue";

export const Providers = defineComponent((props, ctx) => {
  const theme = computed(() => ("dark" === "dark" ? darkTheme : null));
  const Default = ctx.slots["default"];
  return () => (
    <NConfigProvider theme={darkTheme}>
      <NNotificationProvider>
        <NMessageProvider>
          <NLoadingBarProvider>
            <NDialogProvider>
              {/**  @ts-ignore */}
              <Default></Default>
            </NDialogProvider>
          </NLoadingBarProvider>
        </NMessageProvider>
      </NNotificationProvider>
    </NConfigProvider>
  );
});
