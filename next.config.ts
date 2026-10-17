/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /*reactCompiler: true,
};

/*export default nextConfig;*/

/** @type {import('next').NextConfig} */

const nextConfig = {};

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

module.exports = withNextIntl(nextConfig);


