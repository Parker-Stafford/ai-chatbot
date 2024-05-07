import { type Configuration, registerOTel } from '@vercel/otel'
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter
} from '@opentelemetry/sdk-trace-base'
import { OTLPTraceExporter as ProtoOTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { OpenAIInstrumentation } from '@arizeai/openinference-instrumentation-openai'
// import { LangChainInstrumentation } from '@arizeai/openinference-instrumentation-langchain'
// import * as CallbackManagerModule from '@langchain/core/callbacks/manager'
// const lci = new LangChainInstrumentation()
// console.log('test--', CallbackManagerModule)
// lci.manuallyInstrument(CallbackManagerModule)
let config: Configuration = {
  serviceName: 'sample-app',
  instrumentationConfig: { fetch: { enabled: false } },
  instrumentations: [new OpenAIInstrumentation()],

  attributesFromHeaders: {
    client: 'X-Client'
  }
}
debugger

if (process.env.TEST_FETCH_RESOURCE_NAME_TEMPLATE) {
  console.log(
    'Custom fetch resourceNameTemplate:',
    process.env.TEST_FETCH_RESOURCE_NAME_TEMPLATE
  )
  config = {
    ...config,
    instrumentationConfig: {
      ...config.instrumentationConfig
    }
  }
}
console.log('test------------spanscomin')
config = {
  ...config,
  spanProcessors: [
    new SimpleSpanProcessor(
      new ProtoOTLPTraceExporter({
        // This is the url where your phoenix server is running
        url: 'http://localhost:6006/v1/traces'
      })
    ),
    // new SimpleSpanProcessor(new ConsoleSpanExporter()),
    ...(config.spanProcessors ?? [])
  ]
}
registerOTel(config)

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
