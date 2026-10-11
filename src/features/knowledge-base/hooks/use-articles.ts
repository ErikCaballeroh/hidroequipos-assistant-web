"use client";

import { useState } from "react";
import { articles as seed } from "../mocks/articles";
import type { Article } from "../types";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>(seed);

  const saveArticle = (article: Article) => {
    setArticles((r) =>
      r.some((x) => x.id === article.id)
        ? r.map((x) => (x.id === article.id ? article : x))
        : [...r, article],
    );
  };

  return { articles, saveArticle };
}
