"use client";

import { templates } from "../mocks/templates";

export function useQueryTemplates() {
  return { templates: templates.filter((t) => t.active) };
}
