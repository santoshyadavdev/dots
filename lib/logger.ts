type LogLevel = "info" | "warn" | "error" | "debug";

interface LogMetadata {
  [key: string]: any;
}

class ServerLogger {
  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    metadata?: LogMetadata
  ): string {
    const timestamp = this.formatTimestamp();
    const metaStr = metadata ? ` | ${JSON.stringify(metadata)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }

  info(message: string, metadata?: LogMetadata): void {
    console.log(this.formatMessage("info", message, metadata));
  }

  warn(message: string, metadata?: LogMetadata): void {
    console.warn(this.formatMessage("warn", message, metadata));
  }

  error(
    message: string,
    error?: Error | unknown,
    metadata?: LogMetadata
  ): void {
    const errorMeta =
      error instanceof Error
        ? { error: error.message, stack: error.stack, ...metadata }
        : { error: String(error), ...metadata };
    console.error(this.formatMessage("error", message, errorMeta));
  }

  debug(message: string, metadata?: LogMetadata): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(this.formatMessage("debug", message, metadata));
    }
  }

  // API-specific logging methods
  apiRequest(endpoint: string, method: string, params?: any): void {
    this.info(`API Request: ${method} ${endpoint}`, { params });
  }

  apiResponse(
    endpoint: string,
    status: "success" | "error",
    duration?: number,
    metadata?: LogMetadata
  ): void {
    this.info(`API Response: ${endpoint} - ${status}`, {
      duration,
      ...metadata,
    });
  }

  apiError(
    endpoint: string,
    error: Error | unknown,
    metadata?: LogMetadata
  ): void {
    this.error(`API Error: ${endpoint}`, error, metadata);
  }
}

export const logger = new ServerLogger();
