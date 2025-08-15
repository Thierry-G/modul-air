# Guide : Créer un environnement virtuel Python et installer Flask

## 1. Créer un environnement virtuel (venv)

Ouvrez un terminal dans le dossier de votre projet, puis tapez :

```bash
python -m venv venv
```

- Cela crée un dossier `venv` contenant l'environnement virtuel.

## 2. Activer l'environnement virtuel

### Sous Windows (cmd ou PowerShell) :

```bash
venv\Scripts\activate
```

### Sous macOS/Linux :

```bash
source venv/bin/activate
```

- Vous devriez voir le préfixe `(venv)` devant la ligne de commande.

## 3. Installer Flask

Une fois l'environnement activé, installez Flask avec :

```bash
pip install flask
```

- Flask est maintenant disponible uniquement dans cet environnement.

## 4. Vérifier l'installation

```bash
python -m flask --version
```

- Vous devriez voir la version de Flask installée.

## 5. Désactiver l'environnement virtuel

Quand vous avez fini, tapez :

```bash
deactivate
```

---

**Remarque :**
- Utiliser un environnement virtuel permet d'isoler les dépendances de votre projet.
- Répétez ces étapes pour chaque nouveau projet Python.
