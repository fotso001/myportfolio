from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI()

# Allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

# Data
portfolio_data = {
    # ... existing data ...
}

# (Existing data omitted for brevity, keeping the same structure)
# Let's keep the actual data for persistence
portfolio_data = {
    "name": "EPHRAIM BORIS FOTSO",
    "title": "Étudiant Ingénieur – Alternance Cybersécurité & Développement Sécurisé",
    "location": "Île-de-France",
    "phone": "0782610112",
    "email": "fotsoephraim05@gmail.com",
    "links": {
        "github": "https://www.github.com/fotso001",
        "gitlab": "https://gitlab.esiea.fr/ephraimboris.fotsongougiegne",
        "linkedin": "https://www.linkedin.com/in/ephra%C3%AFm-boris-fotso-745143320/"
    },
    "profile": "Futur ingénieur à l’ESIEA spécialisé en Informatique et Cybersécurité. Doté d'une solide maîtrise du développement Fullstack avec une forte sensibilité pour la sécurité applicative (OWASP), la gestion des identités (IAM/JWT) et la protection des flux de données.",
    "skills": {
        "Cybersecurity": ["Top 10 OWASP", "DevSecOps", "Gestion des secrets", "Sécurisation d'APIs REST"],
        "Systems & Networks": ["Linux (Hardening)", "TCP/IP", "HTTPS/TLS", "SSH", "Wireshark"],
        "Backend": ["Python", "Java", "Node.js (Express)", "Nest.js"],
        "Frontend": ["React", "React Native", "JavaScript (ES6+)", "Tailwind CSS", "HTML/CSS"],
        "DevOps & Utils": ["Docker", "Git", "CI/CD", "MySQL", "MongoDB"]
    },
    "experience": [
        {
            "role": "Stage Pro – Sécurisation d'actifs critiques",
            "company": "Ipercash",
            "location": "Yaoundé-Cameroun",
            "period": "novembre 2024 – Mai 2025",
            "highlights": [
                "Conception d'architecture d'authentification robuste via JWT et RBAC",
                "Développement d'une API REST sécurisée avec sanitization systématique (SQLi, XSS)",
                "Gestion de la persistance des données avec hachage sécurisé"
            ]
        },
        {
            "role": "Projet Académique",
            "title": "Application mobile de réservation de parking",
            "highlights": [
                "Développement front-end React/React Native avec stockage sécurisé des secrets",
                "Implémentation de WebSockets (Socket.io) sécurisés via TLS"
            ]
        }
    ],
    "education": [
        {
            "school": "ESIEA, Ivry-sur-Seine, France",
            "degree": "Cycle Ingénieur – informatique numérique (3e année)",
            "period": "Sept. 2025 – Juin 2028"
        },
        {
            "school": "Institut universitaire SIANTOU, Cameroun",
            "degree": "Licence en pro – Génie logiciel & base de données",
            "period": "Sept. 2023 – Nov. 2024"
        }
    ]
}

@app.get("/api/data")
async def get_portfolio_data():
    return portfolio_data

@app.post("/api/contact")
async def contact(msg: ContactMessage):
    print(f"New contact message from {msg.name} ({msg.email}): {msg.message}")
    # In a real app, send an email or save to DB here.
    return {"status": "success", "message": "Message reçu !"}

# Serve CVs for download
if os.path.exists("assets"):
    app.mount("/downloads", StaticFiles(directory="assets"), name="downloads")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
