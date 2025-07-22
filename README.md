
# Store Locator

This is a full-stack project consisting of:
- `store-locator-backend`: a Spring Boot application exposing a REST API
- `store-locator-frontend`: a React Native Web app using Expo and Google Maps API


## Environment Setup

###  1. `store-locator-frontend` - Environment Variables

Create a `.env` file inside the `store-locator-frontend` directory:

```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
EXPO_PUBLIC_API_URL=http://localhost:8080
````

Replace `your_google_maps_api_key_here` with your actual Google Maps API key.



## How to Run the Project

### 1. Run Spring Boot Maven App (`store-locator-backend`)

From the root of the `store-locator-backend` directory, run:

```bash
./mvnw spring-boot:run
```

If you're on Windows:

```cmd
mvnw.cmd spring-boot:run
```

Ensure your `application.properties` is correctly set up and port `8080` is available.

---

### 2. Run React Native Web Expo App (`store-locator-frontend`)

From the root of the `store-locator-frontend` directory:

```bash
npm install
npx expo start --web
```

 This will open the app in your default browser at `http://localhost:8081/`.


## Project Structure

```
zodiac-store-locator/
├── store-locator-backend/       # Spring Boot backend (Java)
└── store-locator-frontend/      # React Native Web frontend (Expo)
```

### Java & Backend Requirements

* **Java 21 is required**
  Make sure you have Java 21 installed:

  ```bash
  java -version
  ```

* **No need to install Maven**
  This project uses the Maven Wrapper (`./mvnw` or `mvnw.cmd`), so a local Maven install is not required.

* **IDE Setup (if using IntelliJ or similar)**

  * Set the Project SDK to **Java 21**.
  * Enable **annotation processing** (required for Lombok and MapStruct).

* **Database**

  * Uses an in-memory **H2 database** by default. No setup needed.

* **Port**

  * Backend runs on **`http://localhost:8080`**.
