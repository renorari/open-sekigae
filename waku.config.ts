import { defineConfig } from "waku/config";

export default defineConfig({
  "vite": {
    "resolve": {
      "dedupe": [
        "react",
        "react-dom",
        "@emotion/react",
        "@emotion/styled"
      ]
    },
    "ssr": {
      "noExternal": [
        "@mui/joy",
        "@mui/icons-material",
        "@mui/material",
        "@mui/system",
        "@mui/utils",
        "@mui/private-theming",
        "@mui/styled-engine",
        "@emotion/react",
        "@emotion/styled",
        "@emotion/cache",
        "@emotion/serialize",
        "@emotion/utils"
      ]
    }
  }
});
