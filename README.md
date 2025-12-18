# IFTS 14 – Frontend Angular

## Scripts disponibles

```bash
npm install          # Instala dependencias
npm start            # ng serve en http://localhost:4200
npm run build        # ng build --configuration production (usa environment.prod.ts)
```

## Deploy a cPanel

1. Ejecutá `npm run build`. El artefacto queda en `dist/ifts14-angular-esbuild/`.
2. Comprimí esa carpeta en `frontend.zip`.
3. En cPanel:
   - File Manager → `public_html/`.
   - Subí `frontend.zip` y descomprimilo dentro de una carpeta (por ejemplo `public_html/app`).
   - Opcional: borrá `frontend.zip` para liberar espacio.
4. Actualizá la configuración de tu hosting para que apunte a la carpeta donde quedó el build (o mové los archivos a la raíz que sirva el sitio).

## Entornos / APIs

- `src/environments/environment.ts`: URLs para desarrollo (ej. backend local).
- `src/environments/environment.prod.ts`: URLs productivas (`https://www.ifts14.com.ar/api/...`).  
- En `angular.json` ya se configuró el reemplazo automático del environment cuando corrés `npm run build`.

## Verificaciones rápidas

- Ejecutá `npm start` y navegá el Home para confirmar que se consumen los endpoints reales (anuncios, horarios y formulario de contacto).
- Revisá en la pestaña Network que el formulario de contacto haga `POST` contra `api/contacto/create.php`.
