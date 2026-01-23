# 🚀 Démarrage Rapide MarsAI

## ⚠️ Problème rencontré : Port 3306 déjà utilisé

Vous avez déjà MySQL installé sur votre machine Windows. **Pas besoin de Docker !**
Utilisez simplement votre MySQL existant.

---

## 📋 Étape 1 : Configurer la base de données MySQL

### Option A : Avec MySQL Workbench (Recommandé)

1. Ouvrez **MySQL Workbench**
2. Connectez-vous à votre serveur MySQL local
3. Allez dans **File** > **Open SQL Script**
4. Sélectionnez le fichier `database_setup.sql` (à la racine du projet)
5. Cliquez sur **Execute** (l'éclair ⚡)
6. Vérifiez que la base `marsai` a été créée

### Option B : Avec phpMyAdmin

1. Ouvrez **phpMyAdmin** dans votre navigateur
2. Cliquez sur **Import**
3. Sélectionnez le fichier `database_setup.sql`
4. Cliquez sur **Go**

### Option C : En ligne de commande

```bash
mysql -u root -p < database_setup.sql
```

---

## 🔧 Étape 2 : Configurer les fichiers d'environnement

### Backend : `back-end/.env`

Le fichier existe déjà. Vérifiez juste votre mot de passe MySQL :

```bash
# Server Configuration
PORT=5000
CORS_ORIGIN=*

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=      # ⚠️ Ajoutez votre mot de passe MySQL ici si vous en avez un
DB_NAME=marsai
```

**Si vous avez un mot de passe root MySQL**, modifiez la ligne :
```bash
DB_PASSWORD=votre_mot_de_passe_mysql
```

### Frontend : `Front-end/.env.local`

Le fichier existe déjà. Vous devez juste ajouter votre **Google Client ID** :

```bash
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=VOTRE_CLIENT_ID_GOOGLE.apps.googleusercontent.com
```

Pour obtenir votre Client ID, suivez le guide : **`SETUP_RAPIDE_GOOGLE_OAUTH.md`**

---

## ▶️ Étape 3 : Démarrer l'application

### Terminal 1 - Backend

```bash
cd back-end
npm install
npm run dev
```

Vous devriez voir :
```
Server running on port 5000
Database connected successfully
```

### Terminal 2 - Frontend

```bash
cd Front-end
npm install
npm run dev
```

Vous devriez voir :
```
Local: http://localhost:5173/
```

---

## ✅ Étape 4 : Tester l'application

1. Ouvrez votre navigateur sur **http://localhost:5173**
2. Allez sur **Register** (S'inscrire)
3. Créez un compte avec un mot de passe fort :
   - Au moins 8 caractères
   - Au moins une majuscule
   - Au moins une minuscule
   - Au moins un chiffre
   - Exemple : `TestPass123`

4. Vous devriez être connecté automatiquement !

---

## 🔐 Étape 5 : Activer Google OAuth (Optionnel)

Suivez le guide : **`SETUP_RAPIDE_GOOGLE_OAUTH.md`** (5 minutes)

Une fois configuré, vous pourrez vous connecter avec Google en un clic !

---

## 🐛 Dépannage

### Erreur : "Database connection failed"

**Cause** : Le backend ne peut pas se connecter à MySQL.

**Solutions** :
1. Vérifiez que MySQL est bien démarré (services Windows)
2. Vérifiez le mot de passe dans `back-end/.env`
3. Vérifiez que la base `marsai` existe

### Erreur : "Port 5000 already in use"

**Solution** : Changez le port dans `back-end/.env` :
```bash
PORT=5001
```

Puis dans `Front-end/.env.local` :
```bash
VITE_API_URL=http://localhost:5001/api
```

### Erreur : "CORS error"

**Cause** : Le frontend ne peut pas communiquer avec le backend.

**Solutions** :
1. Vérifiez que le backend tourne bien
2. Vérifiez que `CORS_ORIGIN=*` dans `back-end/.env`
3. Essayez de redémarrer le backend

### L'alerte Google "mot de passe non sécurisé" apparaît toujours

**Solution** : Utilisez un mot de passe plus fort avec :
- Au moins 8 caractères
- Majuscule + minuscule + chiffre
- Exemple : `MonMotDePasse123`

---

## 📚 Documentation complète

- **`SETUP_RAPIDE_GOOGLE_OAUTH.md`** - Configuration Google OAuth (5 min)
- **`GOOGLE_OAUTH_SETUP.md`** - Guide détaillé Google OAuth
- **`TESTING.md`** - Guide de test complet

---

## ✨ Fonctionnalités disponibles

- ✅ Inscription / Connexion avec email + mot de passe
- ✅ Connexion avec Google OAuth (après configuration)
- ✅ Validation forte des mots de passe
- ✅ Système de rôles (Director, Jury, Admin)
- ✅ Interface utilisateur moderne et responsive
- ✅ Sécurité renforcée (bcrypt, JWT, autocomplete)

---

**🎉 Vous êtes prêt ! Bon développement !**
