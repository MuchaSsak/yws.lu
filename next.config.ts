import type { NextConfig } from "next";

import { SUPABASE_PUBLIC_HOSTNAME } from "@/lib/constants";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: SUPABASE_PUBLIC_HOSTNAME }],
  },
};

export default nextConfig;
