# NodePop

Nodepop es una API de compra/venta de artículos. Ha sido desarrollada con NodeJS.

## Inicialización de la aplicación
Para iniciar la aplicación primero ejecutamos *npm install*. Hecho esto podemos ejecutar la aplicación con los siguientes modos:
- *npm run dev*
- *npm start* 

Para iniciar la base de datos se ha generado un script de instalación inicial. Ejecutamos en terminal *npm run installDB*. Este script borrará todos los registros existentes en la base de datos y añadirá los existentes en el archivo json que hemos creado en la carpeta init.

## Detalles
La aplicación tiene definido un límite de 10 anuncios por página.
Contiene filtros para buscar por diferentes criterios: tags, nombre, precio y venta( nos marca true si está en venta y false si se está buscando).
Accedemos a traves de http://localhost:3001/
