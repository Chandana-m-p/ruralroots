package com.ruralroots.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String home() {
        return """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>🌾 RuralRoots - Server Control Center</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
                <style>
                    :root {
                        --bg-primary: #0a0f0d;
                        --bg-card: rgba(18, 30, 23, 0.7);
                        --border-color: rgba(74, 222, 128, 0.15);
                        --primary: #22c55e;
                        --primary-glow: rgba(34, 197, 94, 0.35);
                        --accent: #eab308;
                        --text-main: #f0fdf4;
                        --text-muted: #86efac;
                        --text-dim: #6ee7b7;
                    }

                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }

                    body {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        background-color: var(--bg-primary);
                        background-image: 
                            radial-gradient(circle at 15% 15%, rgba(34, 197, 94, 0.12) 0%, transparent 45%),
                            radial-gradient(circle at 85% 85%, rgba(234, 179, 8, 0.08) 0%, transparent 45%);
                        color: var(--text-main);
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 2.5rem 1.5rem;
                    }

                    .container {
                        max-width: 1000px;
                        width: 100%;
                    }

                    header {
                        text-align: center;
                        margin-bottom: 2.5rem;
                    }

                    .logo-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        background: rgba(34, 197, 94, 0.1);
                        border: 1px solid rgba(34, 197, 94, 0.3);
                        padding: 0.4rem 1rem;
                        border-radius: 9999px;
                        color: var(--primary);
                        font-weight: 600;
                        font-size: 0.875rem;
                        margin-bottom: 1rem;
                        box-shadow: 0 0 15px var(--primary-glow);
                    }

                    h1 {
                        font-family: 'Outfit', sans-serif;
                        font-size: 3rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #ffffff 0%, #86efac 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 0.75rem;
                        letter-spacing: -0.02em;
                    }

                    p.subtitle {
                        color: #a7f3d0;
                        font-size: 1.125rem;
                        max-width: 650px;
                        margin: 0 auto;
                        line-height: 1.6;
                    }

                    /* Main Action Card */
                    .hero-card {
                        background: linear-gradient(135deg, rgba(20, 40, 28, 0.9) 0%, rgba(10, 25, 18, 0.95) 100%);
                        border: 1px solid rgba(74, 222, 128, 0.3);
                        border-radius: 1.5rem;
                        padding: 2.5rem;
                        text-align: center;
                        margin-bottom: 2rem;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(34, 197, 94, 0.15);
                        position: relative;
                        overflow: hidden;
                    }

                    .hero-card::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 60%);
                        pointer-events: none;
                    }

                    .hero-title {
                        font-family: 'Outfit', sans-serif;
                        font-size: 1.75rem;
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                        color: #ffffff;
                    }

                    .hero-desc {
                        color: #94a3b8;
                        margin-bottom: 1.75rem;
                        font-size: 1rem;
                    }

                    .btn-launch {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.75rem;
                        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                        color: #ffffff;
                        font-family: 'Outfit', sans-serif;
                        font-size: 1.25rem;
                        font-weight: 700;
                        padding: 1rem 2.5rem;
                        border-radius: 9999px;
                        text-decoration: none;
                        box-shadow: 0 10px 25px var(--primary-glow);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        border: none;
                        cursor: pointer;
                    }

                    .btn-launch:hover {
                        transform: translateY(-3px) scale(1.02);
                        box-shadow: 0 15px 35px rgba(34, 197, 94, 0.5);
                    }

                    /* Services Grid */
                    .grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        gap: 1.5rem;
                        margin-bottom: 2.5rem;
                    }

                    .card {
                        background: var(--bg-card);
                        backdrop-filter: blur(12px);
                        border: 1px solid var(--border-color);
                        border-radius: 1rem;
                        padding: 1.5rem;
                        transition: all 0.3s ease;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .card:hover {
                        border-color: rgba(74, 222, 128, 0.4);
                        transform: translateY(-4px);
                        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
                    }

                    .card-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 1rem;
                    }

                    .card-icon {
                        font-size: 1.75rem;
                        background: rgba(34, 197, 94, 0.1);
                        width: 48px;
                        height: 48px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 12px;
                        border: 1px solid rgba(34, 197, 94, 0.2);
                    }

                    .status-pill {
                        font-size: 0.75rem;
                        font-weight: 600;
                        padding: 0.25rem 0.6rem;
                        border-radius: 9999px;
                        background: rgba(34, 197, 94, 0.15);
                        color: #4ade80;
                        border: 1px solid rgba(74, 222, 128, 0.3);
                    }

                    .card-title {
                        font-family: 'Outfit', sans-serif;
                        font-size: 1.25rem;
                        font-weight: 600;
                        margin-bottom: 0.4rem;
                        color: #ffffff;
                    }

                    .card-desc {
                        font-size: 0.875rem;
                        color: #94a3b8;
                        line-height: 1.5;
                        margin-bottom: 1.25rem;
                    }

                    .card-link {
                        color: var(--primary);
                        font-weight: 600;
                        font-size: 0.925rem;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        gap: 0.4rem;
                        transition: gap 0.2s ease;
                    }

                    .card-link:hover {
                        gap: 0.6rem;
                        color: #4ade80;
                    }

                    /* Console Preview Section */
                    .explorer-card {
                        background: var(--bg-card);
                        border: 1px solid var(--border-color);
                        border-radius: 1.25rem;
                        padding: 1.5rem;
                        margin-bottom: 2.5rem;
                    }

                    .explorer-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 1rem;
                    }

                    .explorer-title {
                        font-family: 'Outfit', sans-serif;
                        font-size: 1.125rem;
                        font-weight: 600;
                        color: #ffffff;
                    }

                    .endpoint-btns {
                        display: flex;
                        gap: 0.5rem;
                        flex-wrap: wrap;
                        margin-bottom: 1rem;
                    }

                    .ep-btn {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        color: #cbd5e1;
                        padding: 0.4rem 0.8rem;
                        border-radius: 8px;
                        font-size: 0.825rem;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }

                    .ep-btn:hover, .ep-btn.active {
                        background: rgba(34, 197, 94, 0.2);
                        border-color: var(--primary);
                        color: #ffffff;
                    }

                    pre {
                        background: #050807;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 10px;
                        padding: 1rem;
                        overflow-x: auto;
                        font-family: 'Courier New', monospace;
                        font-size: 0.85rem;
                        color: #4ade80;
                        max-height: 250px;
                    }

                    footer {
                        text-align: center;
                        color: #64748b;
                        font-size: 0.875rem;
                        margin-top: auto;
                    }

                    footer a {
                        color: var(--primary);
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <div class="logo-badge">
                            <span style="display:inline-block; width:8px; height:8px; background:#22c55e; border-radius:50%; box-shadow: 0 0 8px #22c55e;"></span>
                            RURALROOTS CORE SERVER
                        </div>
                        <h1>Digital Inclusion E-Commerce Platform</h1>
                        <p class="subtitle">Spring Boot 3.2 Backend Service & Vite PWA Application Suite</p>
                    </header>

                    <!-- Main Banner Card -->
                    <div class="hero-card">
                        <div class="hero-title">🌾 Open RuralRoots Web Application</div>
                        <div class="hero-desc">Access the main user interface with offline-first PWA catalog, cart, and village hub pickup.</div>
                        <a href="http://localhost:3000" class="btn-launch" target="_self">
                            🚀 Launch Web App (Port 3000) &rarr;
                        </a>
                    </div>

                    <!-- Quick Links Grid -->
                    <div class="grid">
                        <div class="card">
                            <div>
                                <div class="card-header">
                                    <div class="card-icon">📱</div>
                                    <span class="status-pill">PORT 3000</span>
                                </div>
                                <div class="card-title">Frontend PWA App</div>
                                <div class="card-desc">React 18 multi-lingual offline e-commerce web client interface.</div>
                            </div>
                            <a href="http://localhost:3000" class="card-link">Open Frontend Web App &rarr;</a>
                        </div>

                        <div class="card">
                            <div>
                                <div class="card-header">
                                    <div class="card-icon">🗄️</div>
                                    <span class="status-pill">H2 MEMORY DB</span>
                                </div>
                                <div class="card-title">Database Console</div>
                                <div class="card-desc">Inspect orders, products, users, and village hubs database tables directly.</div>
                            </div>
                            <a href="http://localhost:8080/h2-console" target="_blank" class="card-link">Launch H2 Console &rarr;</a>
                        </div>

                        <div class="card">
                            <div>
                                <div class="card-header">
                                    <div class="card-icon">📦</div>
                                    <span class="status-pill">REST API</span>
                                </div>
                                <div class="card-title">Product Catalog API</div>
                                <div class="card-desc">Fetch localized products with multi-lingual title and description payloads.</div>
                            </div>
                            <a href="http://localhost:8080/api/v1/products" target="_blank" class="card-link">View Product API &rarr;</a>
                        </div>

                        <div class="card">
                            <div>
                                <div class="card-header">
                                    <div class="card-icon">🏪</div>
                                    <span class="status-pill">REST API</span>
                                </div>
                                <div class="card-title">Village Hubs API</div>
                                <div class="card-desc">Retrieve registered Kirana Village Hub pickup locations across states.</div>
                            </div>
                            <a href="http://localhost:8080/api/v1/hubs" target="_blank" class="card-link">View Hubs API &rarr;</a>
                        </div>
                    </div>

                    <!-- Interactive REST API Tester -->
                    <div class="explorer-card">
                        <div class="explorer-header">
                            <div class="explorer-title">⚡ Live API Endpoint Tester</div>
                            <span style="font-size:0.8rem; color:#64748b;">http://localhost:8080</span>
                        </div>
                        <div class="endpoint-btns">
                            <button class="ep-btn active" onclick="fetchApi('/api/v1/products', this)">GET /api/v1/products</button>
                            <button class="ep-btn" onclick="fetchApi('/api/v1/hubs', this)">GET /api/v1/hubs</button>
                        </div>
                        <pre id="json-output">Loading API response...</pre>
                    </div>

                    <footer>
                        RuralRoots Platform &bull; Built with Spring Boot 3.2 & React 18 PWA
                    </footer>
                </div>

                <script>
                    function fetchApi(endpoint, btn) {
                        document.querySelectorAll('.ep-btn').forEach(b => b.classList.remove('active'));
                        if (btn) btn.classList.add('active');
                        document.getElementById('json-output').innerText = 'Fetching ' + endpoint + '...';
                        fetch(endpoint)
                            .then(res => res.json())
                            .then(data => {
                                document.getElementById('json-output').innerText = JSON.stringify(data, null, 2);
                            })
                            .catch(err => {
                                document.getElementById('json-output').innerText = 'Error: ' + err;
                            });
                    }
                    // Auto load products on init
                    fetchApi('/api/v1/products');
                </script>
            </body>
            </html>
            """;
    }
}
