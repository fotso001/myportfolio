from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI()

# ─────────────────────────────────────────
# CORS
# ─────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        os.getenv("FRONTEND_URL", "https://myporfolio-beryl.vercel.app")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────
# Models
# ─────────────────────────────────────────
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

# ─────────────────────────────────────────
# Data (données sensibles via variables d'environnement)
# ─────────────────────────────────────────
portfolio_data = {
    "name": "EPHRAIM BORIS FOTSO",
    "title": "Développeur Fullstack & Étudiant Ingénieur (Projets Cybersécurité)",
    "location": "Île-de-France",
    "phone": os.getenv("CONTACT_PHONE", ""),
    "email": os.getenv("CONTACT_EMAIL", ""),
    "links": {
        "github": "https://www.github.com/fotso001",
        "gitlab": "https://gitlab.esiea.fr/ephraimboris.fotsongougiegne",
        "linkedin": "https://www.linkedin.com/in/ephra%C3%AFm-boris-fotso-745143320/"
    },
    "profile": "Développeur Fullstack passionné, actuellement étudiant ingénieur à l'ESIEA. J'ai une solide expertise dans la création d'applications web et mobiles complètes. En parallèle, je mène activement des projets en Cybersécurité pour intégrer les meilleures pratiques (OWASP, IAM, protection des données) au cœur de mes développements.",
    "skills": {
        "Frontend": ["React", "React Native", "JavaScript (ES6+)", "Tailwind CSS", "HTML/CSS"],
        "Backend": ["Python", "Java", "Node.js (Express)", "Nest.js"],
        "Cybersecurity": ["Top 10 OWASP", "DevSecOps", "Gestion des secrets", "Sécurisation d'APIs REST"],
        "Systems & Networks": ["Linux (Hardening)", "TCP/IP", "HTTPS/TLS", "SSH", "Wireshark"],
        "DevOps & Utils": ["Docker", "Git", "CI/CD", "MySQL", "MongoDB"]
    },
    "experience": [
        {
            "badge": "FULLSTACK",
            "role": "Stage Pro – Développement Web",
            "company": "Ipercash",
            "location": "Yaoundé-Cameroun",
            "period": "novembre 2024 – Mai 2025",
            "highlights": [
                "Développement d'une application de gestion de vente et de stock (utilisateur, produits, commande)",
                "Création d'une API REST sécurisée avec JWT et middleware d'authentification"
            ]
        },
        {
            "badge": "CYBERSEC",
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
            "badge": "FULLSTACK",
            "role": "Application mobile de réservation de parking",
            "company": "Projet Académique",
            "location": "University SIANTOU",
            "period": "2024",
            "highlights": [
                "Application mobile incluant inscription et réservation",
                "Intégration en temps réel de la messagerie via Socket.io",
                "Développement du backend en Node.js avec le modèle MVC"
            ]
        },
        {
            "badge": "CYBERSEC",
            "role": "Réservation de parking (Sécurité intégrée)",
            "company": "Projet Académique",
            "location": "University SIANTOU",
            "period": "2024",
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

# ─────────────────────────────────────────
# Routes
# ─────────────────────────────────────────
@app.get("/api/data")
async def get_portfolio_data():
    return portfolio_data


@app.post("/api/contact")
async def contact(msg: ContactMessage):
    """
    Reçoit un message du formulaire de contact.
    Envoie un email via le service Resend (https://resend.com – gratuit jusqu'à 3000 emails/mois).
    
    Pour activer l'envoi d'email :
      1. Créer un compte sur resend.com
      2. Récupérer ton API key
      3. Ajouter RESEND_API_KEY dans tes variables d'environnement (GitHub Secrets + Render)
      4. Décommenter le bloc ci-dessous et ajouter 'resend' dans requirements.txt
    """
 #je n'ai pas encore créé mon compte sur resend.com
    # ── Option A : Resend (recommandé, simple) ──────────────────────────────
    # import resend
    # resend.api_key = os.getenv("RESEND_API_KEY")
    # resend.Emails.send({
    #     "from": "portfolio@yourdomain.com",
    #     "to": os.getenv("CONTACT_EMAIL"),
    #     "subject": f"[Portfolio] Message de {msg.name}",
    #     "html": f"""
    #         <p><strong>De :</strong> {msg.name} ({msg.email})</p>
    #         <p><strong>Message :</strong></p>
    #         <p>{msg.message}</p>
    #     """
    # })
    # ────────────────────────────────────────────────────────────────────────

    # Log temporaire jusqu'à activation de l'envoi d'email
    print(f"[CONTACT] {msg.name} <{msg.email}> : {msg.message}")

    return {"status": "success", "message": "Message reçu !"}


# ─────────────────────────────────────────
# Static files (CV download)
# ─────────────────────────────────────────
if os.path.exists("assets"):
    app.mount("/downloads", StaticFiles(directory="assets"), name="downloads")


# ─────────────────────────────────────────
# Entrypoint local
# ─────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)