export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node')
  }

  /*
  const origConsoleError = console.error;
  if (typeof process !== "undefined" && typeof process.on === "function") {
    process.on("uncaughtException", (e) => {
      origConsoleError("[uncaughtException]", e);
    });
    process.on("unhandledRejection", (e) => {
      origConsoleError("[unhandledRejection]", e);
    });
  }
  console.error = (...args: unknown[]) => {
    const error = args.find((arg) => {
      return arg && arg instanceof Error;
    });
    origConsoleError(
      "[console_error]",
      "hasError:",
      !!error,
      "digest:",
      (error as any | undefined)?.digest,
      ...args
    );
  };
  */
}
