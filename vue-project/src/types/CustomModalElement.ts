import type { Component } from "vue";

export interface CustomModalElement {
  component: Component;
  props?: Record<string, unknown>;
}
