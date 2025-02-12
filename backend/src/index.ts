/**
 * Entry point for the backend application.
 * @module index
 */

import { testDB } from "./database";
import { init } from "./server";

/**
 * Initializes the server and starts listening on the specified port.
 * Tests the database connection before starting the server.
 */
init().then((app) => {
  const PORT = process.env.PORT || 5000;
  testDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
