import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NLoadingBarProvider,
  NNotificationProvider,
} from "naive-ui";

import { darkTheme } from "naive-ui";
import { h, Fragment, computed, defineComponent } from "vue";

export const Providers = defineComponent((props, { slots }) => {
  const theme = computed(() => ("dark" === "dark" ? darkTheme : null));
  // const Default = slots["default"];
  return () => (
    <NConfigProvider theme={darkTheme}>
      {{
        default: () => (
          <NNotificationProvider>
            {{
              default: () => (
                <NMessageProvider>
                  {{
                    default: () => (
                      <NLoadingBarProvider>
                        {{
                          default: () => <NDialogProvider>
                            {{
                              default:slots.default
                            }}
                          </NDialogProvider>,
                        }}
                      </NLoadingBarProvider>
                    ),
                  }}
                </NMessageProvider>
              ),
            }}
          </NNotificationProvider>
        ),
      }}
    </NConfigProvider>
  );
});
