import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class StaticFileServer {
    public static void main(String[] args) throws Exception {
        int port = 8080;
        Path root = Paths.get(".").toAbsolutePath().normalize();

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", new StaticHandler(root));
        server.setExecutor(null);
        server.start();

        System.out.println("Java static server started at http://localhost:" + port + "/");
        System.out.println("Serving files from: " + root);
    }

    private static class StaticHandler implements HttpHandler {
        private final Path root;

        StaticHandler(Path root) {
            this.root = root;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String requestPath = exchange.getRequestURI().getPath();
            if (requestPath == null || requestPath.isEmpty()) {
                requestPath = "/index.html";
            }

            Path target = root.resolve(requestPath.substring(1)).normalize();
            if (!target.startsWith(root)) {
                sendResponse(exchange, 403, "Forbidden");
                return;
            }

            if (Files.isDirectory(target)) {
                target = target.resolve("index.html");
            }

            if (!Files.exists(target) || Files.isDirectory(target)) {
                sendResponse(exchange, 404, "Not Found");
                return;
            }

            byte[] data = Files.readAllBytes(target);
            String contentType = Files.probeContentType(target);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.sendResponseHeaders(200, data.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(data);
            }
        }

        private void sendResponse(HttpExchange exchange, int status, String body) throws IOException {
            byte[] data = body.getBytes();
            exchange.sendResponseHeaders(status, data.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(data);
            }
        }
    }
}
