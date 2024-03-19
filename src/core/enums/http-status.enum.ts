export enum HttpStatusEnum {
    // Informational
    CONTINUE = 100,
    CONTINUE_MESSAGE = 'Continue',
    SWITCHING_PROTOCOLS = 101,
    SWITCHING_PROTOCOLS_MESSAGE = 'Switching Protocols',
    PROCESSING = 102,
    PROCESSING_MESSAGE = 'Processing',

    // Success
    OK = 200,
    OK_MESSAGE = 'OK',
    CREATED = 201,
    CREATED_MESSAGE = 'Created',
    ACCEPTED = 202,
    ACCEPTED_MESSAGE = 'Accepted',
    NON_AUTHORITATIVE_INFORMATION = 203,
    NON_AUTHORITATIVE_INFORMATION_MESSAGE = 'Non-Authoritative Information',
    NO_CONTENT = 204,
    NO_CONTENT_MESSAGE = 'No Content',
    RESET_CONTENT = 205,
    RESET_CONTENT_MESSAGE = 'Reset Content',
    PARTIAL_CONTENT = 206,
    PARTIAL_CONTENT_MESSAGE = 'Partial Content',
    MULTI_STATUS = 207,
    MULTI_STATUS_MESSAGE = 'Multi-Status',
    ALREADY_REPORTED = 208,
    ALREADY_REPORTED_MESSAGE = 'Already Reported',
    IM_USED = 226,
    IM_USED_MESSAGE = 'IM Used',

    // Redirection
    MULTIPLE_CHOICES = 300,
    MULTIPLE_CHOICES_MESSAGE = 'Multiple Choices',
    MOVED_PERMANENTLY = 301,
    MOVED_PERMANENTLY_MESSAGE = 'Moved Permanently',
    FOUND = 302,
    FOUND_MESSAGE = 'Found',
    SEE_OTHER = 303,
    SEE_OTHER_MESSAGE = 'See Other',
    NOT_MODIFIED = 304,
    NOT_MODIFIED_MESSAGE = 'Not Modified',
    USE_PROXY = 305,
    USE_PROXY_MESSAGE = 'Use Proxy',
    TEMPORARY_REDIRECT = 307,
    TEMPORARY_REDIRECT_MESSAGE = 'Temporary Redirect',
    PERMANENT_REDIRECT = 308,
    PERMANENT_REDIRECT_MESSAGE = 'Permanent Redirect',

    // Client Errors
    BAD_REQUEST = 400,
    BAD_REQUEST_MESSAGE = 'Bad Request',
    UNAUTHORIZED = 401,
    UNAUTHORIZED_MESSAGE = 'Unauthorized',
    PAYMENT_REQUIRED = 402,
    PAYMENT_REQUIRED_MESSAGE = 'Payment Required',
    FORBIDDEN = 403,
    FORBIDDEN_MESSAGE = 'Forbidden',
    NOT_FOUND = 404,
    NOT_FOUND_MESSAGE = 'Not Found',
    METHOD_NOT_ALLOWED = 405,
    METHOD_NOT_ALLOWED_MESSAGE = 'Method Not Allowed',
    NOT_ACCEPTABLE = 406,
    NOT_ACCEPTABLE_MESSAGE = 'Not Acceptable',
    PROXY_AUTHENTICATION_REQUIRED = 407,
    PROXY_AUTHENTICATION_REQUIRED_MESSAGE = 'Proxy Authentication Required',
    REQUEST_TIMEOUT = 408,
    REQUEST_TIMEOUT_MESSAGE = 'Request Timeout',
    CONFLICT = 409,
    CONFLICT_MESSAGE = 'Conflict',
    GONE = 410,
    GONE_MESSAGE = 'Gone',
    LENGTH_REQUIRED = 411,
    LENGTH_REQUIRED_MESSAGE = 'Length Required',
    PRECONDITION_FAILED = 412,
    PRECONDITION_FAILED_MESSAGE = 'Precondition Failed',
    PAYLOAD_TOO_LARGE = 413,
    PAYLOAD_TOO_LARGE_MESSAGE = 'Payload Too Large',
    URI_TOO_LONG = 414,
    URI_TOO_LONG_MESSAGE = 'URI Too Long',
    UNSUPPORTED_MEDIA_TYPE = 415,
    UNSUPPORTED_MEDIA_TYPE_MESSAGE = 'Unsupported Media Type',
    RANGE_NOT_SATISFIABLE = 416,
    RANGE_NOT_SATISFIABLE_MESSAGE = 'Range Not Satisfiable',
    EXPECTATION_FAILED = 417,
    EXPECTATION_FAILED_MESSAGE = 'Expectation Failed',
    IM_A_TEAPOT = 418,
    IM_A_TEAPOT_MESSAGE = "I'm a teapot",
    MISDIRECTED_REQUEST = 421,
    MISDIRECTED_REQUEST_MESSAGE = 'Misdirected Request',
    UNPROCESSABLE_ENTITY = 422,
    UNPROCESSABLE_ENTITY_MESSAGE = 'Unprocessable Entity',
    LOCKED = 423,
    LOCKED_MESSAGE = 'Locked',
    FAILED_DEPENDENCY = 424,
    FAILED_DEPENDENCY_MESSAGE = 'Failed Dependency',
    TOO_EARLY = 425,
    TOO_EARLY_MESSAGE = 'Too Early',
    UPGRADE_REQUIRED = 426,
    UPGRADE_REQUIRED_MESSAGE = 'Upgrade Required',
    PRECONDITION_REQUIRED = 428,
    PRECONDITION_REQUIRED_MESSAGE = 'Precondition Required',
    TOO_MANY_REQUESTS = 429,
    TOO_MANY_REQUESTS_MESSAGE = 'Too Many Requests',
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    REQUEST_HEADER_FIELDS_TOO_LARGE_MESSAGE = 'Request Header Fields Too Large',
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    UNAVAILABLE_FOR_LEGAL_REASONS_MESSAGE = 'Unavailable For Legal Reasons',

    // Server Errors
    INTERNAL_SERVER_ERROR = 500,
    INTERNAL_SERVER_ERROR_MESSAGE = 'Internal Server Error',
    NOT_IMPLEMENTED = 501,
    NOT_IMPLEMENTED_MESSAGE = 'Not Implemented',
    BAD_GATEWAY = 502,
    BAD_GATEWAY_MESSAGE = 'Bad Gateway',
    SERVICE_UNAVAILABLE = 503,
    SERVICE_UNAVAILABLE_MESSAGE = 'Service Unavailable',
    GATEWAY_TIMEOUT = 504,
    GATEWAY_TIMEOUT_MESSAGE = 'Gateway Timeout',
    HTTP_VERSION_NOT_SUPPORTED = 505,
    HTTP_VERSION_NOT_SUPPORTED_MESSAGE = 'HTTP Version Not Supported',
    VARIANT_ALSO_NEGOTIATES = 506,
    VARIANT_ALSO_NEGOTIATES_MESSAGE = 'Variant Also Negotiates',
    INSUFFICIENT_STORAGE = 507,
    INSUFFICIENT_STORAGE_MESSAGE = 'Insufficient Storage',
    LOOP_DETECTED = 508,
    LOOP_DETECTED_MESSAGE = 'Loop Detected',
    NOT_EXTENDED = 510,
    NOT_EXTENDED_MESSAGE = 'Not Extended',
    NETWORK_AUTHENTICATION_REQUIRED = 511,
    NETWORK_AUTHENTICATION_REQUIRED_MESSAGE = 'Network Authentication Required',
}
