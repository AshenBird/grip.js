import { INNER_OPTION } from "@/Symbols";
import { inject } from "vue";

export const useRefresh = (action?: (...args: any[]) => any) => {
  const innerOption = inject(INNER_OPTION) as Grip.InnerOption;
  if (action) {
    innerOption.refresh = action;
  }
  return innerOption.refresh
}