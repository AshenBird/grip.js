import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NLoadingBarProvider,
  NNotificationProvider,
} from "naive-ui";

import { darkTheme } from "naive-ui";
import { h, Fragment, computed, defineComponent } from "vue";

export default defineComponent(() => {
  const theme = computed(() => ("dark" === "dark" ? darkTheme : null));
  return () => (
    <NConfigProvider theme={darkTheme}>
      <NNotificationProvider>
        <NMessageProvider>
          <NLoadingBarProvider>
            <NDialogProvider>
              <slot></slot>
            </NDialogProvider>
          </NLoadingBarProvider>
        </NMessageProvider>
      </NNotificationProvider>
    </NConfigProvider>
  );
});
