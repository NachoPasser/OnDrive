//host que pueden realizar peticiones
const ALLOWED_ORIGINS = [
  "https://on-drive.vercel.app",
  /https:\/\/on-drive-.*-.*.vercel.app/,
  /http:\/\/localhost:([0-9]{4})/,
];

//access-control-allow:
const OPTIONS = {
  origin: ALLOWED_ORIGINS,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "case",
  ],
};

module.exports = { OPTIONS };
