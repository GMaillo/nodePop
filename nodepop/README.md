# NodePop 2.0 (Práctica backend-avanzado)
_Nodepop es un API de que proporciona un servicio de compra/venta de artículos de segunda mano.

## Instalacion
```
Primero ejecutamos el comando `npm run installDB`, de esta manera limpiamos la base de datos y cargamos el archivo anuncios.json junto con el usuario creado para el login.
```
Ejecutamos `npm run dev`para arrancar en modo dev o `npm run prod` para arrancar en modo normal.
```
Ejecutamos `npm run thumbnail` para arrancar el servicio creado para generar thumbnails.
```

## API 

1. Primero debemos hacer el login con el email `user@example.com` y la contraseña `1234`, utilizando POSTMAN, hacemos una llamada con el método POST a `http://localhost:3001/apiv1/login` , y de esta manera obtenemos un token de autenticación, con el que podremos acceder a los anuncios haciendo una llamada con el método GET a `http://localhost:3001/apiv1/anuncios`.
Si no disponemos del token o lo hemos puesto de manera incorrecta nos dará un error.

2. Arrancado el servicio de thumbnail, para introducir un anuncio nuevo hacemos una llamada con el método POST a `http://localhost:3001/apiv1/anuncios`. Con la KEY `foto` cargamos en VALUE la imagen y añadimos el token de autenticación.

3. En el navbar se añade internacionalización para cambiar entre los idiomas `español` e `ingles`


## Detalles
La aplicación tiene definido un límite de 10 anuncios por página.
Contiene filtros para buscar por diferentes criterios: tags, nombre, precio y venta( nos marca true si está en venta y false si se está buscando).
Accedemos a traves de http://localhost:3001/

## Dependencias utilizadas para requisitos de la práctica

### Internacionalización
"i18n": "^0.8.4"

### Autenticación
"bcrypt": "^3.0.7",
"jsonwebtoken": "^8.5.1"

### Servicio de thumbnails
"cote": "^0.21.1",
"multer": "^1.4.2",
"jimp": "^0.8.5"

