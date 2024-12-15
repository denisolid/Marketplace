export class ApiResponse {
  static success(data, message = 'Success') {
    return {
      status: 'success',
      message,
      data
    };
  }

  static error(message, statusCode = 500, errors = null) {
    return {
      status: 'error',
      message,
      ...(errors && { errors })
    };
  }

  static paginate(data, page, limit, total) {
    return {
      status: 'success',
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }
}