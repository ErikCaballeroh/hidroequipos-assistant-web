import type { components } from "@/lib/api/schema";

export type Article = components["schemas"]["KnowledgeBaseEntity"];
export type CreateArticleInput = components["schemas"]["CreateKnowledgeBaseDto"];
export type UpdateArticleInput = components["schemas"]["UpdateKnowledgeBaseDto"];
