import { isAxiosError } from "axios";

export type ApiError = {
  status: number;
  message: string;
};

type NestErrorBody = {
  message?: string | string[];
  error?: string;
};

function normalizeMessage(message: string | string[] | undefined, fallback: string): string {
  if (Array.isArray(message)) return message.join(" ");
  return message ?? fallback;
}

export function toApiError(error: unknown): ApiError {
  if (isAxiosError<NestErrorBody>(error)) {
    if (error.response) {
      return {
        status: error.response.status,
        message: normalizeMessage(error.response.data?.message, error.message),
      };
    }
    return {
      status: 0,
      message: "No se pudo conectar con el servidor. Verifica tu conexión.",
    };
  }

  return {
    status: 0,
    message: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
  };
}
