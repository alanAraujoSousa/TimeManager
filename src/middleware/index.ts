import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from "./commons";

import { handleAPIDocs } from "./apiDocs";

export default [handleCors, handleBodyRequestParsing, handleCompression, handleAPIDocs];

