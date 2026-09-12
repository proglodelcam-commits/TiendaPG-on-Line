# 🔒 Checklist de Seguridad — PG del Campo

## ⚠️ Alerta de GitHub: Clave API de Google expuesta

GitHub detectó que una clave API de Google fue encontrada en el repositorio.
Sigue estos pasos **inmediatamente**:

### 1. Revocar la clave en Google
1. Ir a [Google Cloud Console → Credenciales](https://console.cloud.google.com/apis/credentials)
2. Localizar la clave comprometida
3. Clic en **Eliminar** o **Restringir** la clave
4. Crear una **nueva clave** si es necesaria

### 2. Rotar la clave (crear una nueva)
- Generar nueva clave en Google Cloud Console
- Coloca la nueva clave en un archivo `.env` local (NUNCA en GitHub)
- Usa la clave desde `.env` en tu código, no hardcodeada

### 3. Limpiar el historial de Git
Si la clave ya fue commiteada:
```bash
# Opción A: Usar git-filter-repo (recomendado)
pip install git-filter-repo
git filter-repo --invert-paths --path .env

# Opción B: BFG Repo-Cleaner
java -jar bfg.jar --delete-files .env

# Forzar push del historial limpio
git push origin --force --all
```

### 4. Cerrar la alerta en GitHub
1. Ir a [GitHub → Security tab](https://github.com/settings/security)
2. Buscar la alerta de la clave expuesta
3. Marcar como **Revocada** después de completar los pasos anteriores

## ✅ Prevención futura

- [x] `.gitignore` configurado para excluir `.env` y archivos de claves
- [x] `.env.example` como plantilla (sin valores reales)
- [ ] Habilitar **secret scanning** en GitHub (Settings → Security → Code security)
- [ ] Usar **GitHub Secrets** para claves en workflows de CI/CD
- [ ] Restringir claves de API por dominio en Google Cloud Console
- [ ] Revisar periódicamente las credenciales en Google Cloud Console

## 🛡️ Buenas prácticas

1. **Nunca** pongas claves API directamente en HTML/JS
2. **Siempre** usa variables de entorno o un backend proxy
3. **Restringe** las claves de Google Maps a dominios específicos
4. **Rota** las claves periódicamente
5. **Monitorea** los registros de uso de la API en Google Cloud Console
