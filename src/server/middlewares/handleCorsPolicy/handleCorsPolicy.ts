import cors from "cors";

const handleCorsPolicy = cors({
  origin: (corsOrigin, callback) => {
    if (!corsOrigin) {
      return callback(null, true);
    }

    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

    const isOriginAllowed = allowedOrigins.some((origin) =>
      corsOrigin?.includes(origin),
    );

    if (isOriginAllowed) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS policy"), false);
  },
  credentials: true,
});

export default handleCorsPolicy;
