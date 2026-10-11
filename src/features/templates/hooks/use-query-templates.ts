"use client";

import { useState } from "react";
import { templates as seed } from "../mocks/templates";
import type { QueryTemplate } from "../types";

export function useQueryTemplates() {
  const [templates, setTemplates] = useState<QueryTemplate[]>(seed);

  const reorder = (from: number, to: number) => {
    if (to < 0 || to >= templates.length) return;
    setTemplates((r) => {
      const copy = [...r];
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy;
    });
  };

  const saveTemplate = (template: QueryTemplate) => {
    setTemplates((r) =>
      r.some((x) => x.id === template.id)
        ? r.map((x) => (x.id === template.id ? template : x))
        : [...r, template],
    );
  };

  const toggleActive = (id: string) => {
    setTemplates((r) =>
      r.map((x) => (x.id === id ? { ...x, active: !x.active } : x)),
    );
  };

  return { templates, reorder, saveTemplate, toggleActive };
}
