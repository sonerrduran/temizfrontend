/**
 * Error handling utilities
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public fields?: Record<string, string>) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Kimlik doğrulama başarısız') {
    super(message, 'AUTHENTICATION_ERROR', 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Bu işlem için yetkiniz yok') {
    super(message, 'AUTHORIZATION_ERROR', 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Kaynak bulunamadı') {
    super(message, 'NOT_FOUND', 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Kaynak zaten mevcut') {
    super(message, 'CONFLICT', 409);
  }
}

export const errorHandler = {
  handle: (error: unknown): { message: string; code: string; statusCode: number } => {
    if (error instanceof AppError) {
      return {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'INTERNAL_ERROR',
        statusCode: 500,
      };
    }

    return {
      message: 'Bilinmeyen bir hata oluştu',
      code: 'UNKNOWN_ERROR',
      statusCode: 500,
    };
  },

  log: (error: unknown): void => {
    if (error instanceof AppError) {
      console.error(`[${error.code}] ${error.message}`, {
        statusCode: error.statusCode,
        stack: error.stack,
      });
    } else if (error instanceof Error) {
      console.error('Error:', error.message, error.stack);
    } else {
      console.error('Unknown error:', error);
    }
  },

  getUserMessage: (error: unknown): string => {
    if (error instanceof AppError) {
      return error.message;
    }
    return 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  },
};
