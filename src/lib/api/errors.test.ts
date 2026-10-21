import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it } from "vitest";
import { toApiError } from "./errors";

function axiosErrorWithResponse(status: number, message: string | string[]) {
  return new AxiosError(
    "Request failed",
    "ERR_BAD_REQUEST",
    undefined,
    undefined,
    {
      status,
      statusText: "Error",
      headers: {},
      config: { headers: new AxiosHeaders() },
      data: { message },
    },
  );
}

describe("toApiError", () => {
  it("normalizes an Axios error with a string message", () => {
    const result = toApiError(axiosErrorWithResponse(400, "El nombre es obligatorio"));
    expect(result).toEqual({ status: 400, message: "El nombre es obligatorio" });
  });

  it("joins an array of validation messages", () => {
    const result = toApiError(
      axiosErrorWithResponse(400, ["El nombre es obligatorio", "El precio debe ser positivo"]),
    );
    expect(result).toEqual({
      status: 400,
      message: "El nombre es obligatorio El precio debe ser positivo",
    });
  });

  it("returns a network-error message when there is no response", () => {
    const error = new AxiosError("Network Error", "ERR_NETWORK");
    const result = toApiError(error);
    expect(result).toEqual({
      status: 0,
      message: "No se pudo conectar con el servidor. Verifica tu conexión.",
    });
  });

  it("falls back to the Error's message for a non-Axios error", () => {
    const result = toApiError(new Error("algo salió mal"));
    expect(result).toEqual({ status: 0, message: "algo salió mal" });
  });

  it("falls back to a generic message for a non-Error value", () => {
    const result = toApiError("not an error");
    expect(result).toEqual({ status: 0, message: "Ocurrió un error inesperado." });
  });
});
