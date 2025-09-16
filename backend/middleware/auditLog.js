import AuditLog from "../models/AuditLog.js";

const auditLog = (action, resource) => {
  return async (req, res, next) => {
    // Store original response methods
    const originalSend = res.send;
    const originalJson = res.json;

    // Override res.send
    res.send = function (data) {
      // Log successful operations (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        logAudit(req, action, resource, data);
      }
      // Call original method
      originalSend.call(this, data);
    };

    // Override res.json
    res.json = function (data) {
      // Log successful operations (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        logAudit(req, action, resource, data);
      }
      // Call original method
      originalJson.call(this, data);
    };

    next();
  };
};

const logAudit = async (req, action, resource, responseData) => {
  try {
    const auditData = {
      user: req.user ? req.user._id : null,
      action,
      resource,
      resourceId: getResourceId(req, responseData),
      details: {
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        query: req.query,
        // Don't log sensitive data like passwords
        body: sanitizeBody(req.body),
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
    };

    await AuditLog.create(auditData);
  } catch (error) {
    console.error("Audit logging error:", error);
  }
};

const getResourceId = (req, responseData) => {
  // Try to get ID from params first
  if (req.params.id) return req.params.id;

  // Try to get ID from response data
  if (responseData && typeof responseData === "object") {
    const parsed =
      typeof responseData === "string" ? JSON.parse(responseData) : responseData;
    if (parsed.data && parsed.data._id) return parsed.data._id.toString();
    if (parsed._id) return parsed._id.toString();
    if (parsed.id) return parsed.id.toString();
  }

  return "unknown";
};

const sanitizeBody = (body) => {
  if (!body || typeof body !== "object") return body;

  const sanitized = { ...body };
  delete sanitized.password;
  delete sanitized.confirmPassword;
  return sanitized;
};

export default auditLog;
