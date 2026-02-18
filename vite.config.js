import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import apiHandler from "./api/send.js";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Expose env to process.env for the API handler
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        svgrOptions: {
          exportType: "default",
        },
      }),
      {
        name: "api-handler",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/api/send" && req.method === "POST") {
              await apiHandler(req, res);
            } else {
              next();
            }
          });
        },
      },
    ],
  };
});
