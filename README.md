TOPICOS ESPECIALES
# :information_desk_person: Samanta Michelle Gómez Jácome

# **Instrucciones**

Desarrollar en ionic una aplicación que me permita chatear y que guarde todos los mensajes de cada usuario, los mensajes deben guardarse cifrados. Se debe registrar el texto escrito y el usuario que ingresa dicho texto, es decir se dbe implementar un login.
El chat permitirá subir imágenes, las cuales también deben ser protegidas.
Entregables: Repositorio de github con readme detallado que incluya un video del funcionamiento del aplicativo. Subir el link del video y el apk en el repositorio. El readme y el video deben tener la explicación de las funciones y métodos implementados. 
Agregar como colaborador a jzaldumbide@gmail.com

# **DESARROLLO DEL APLICATIVO**

Se requiere que antes de comenzar se combruebe las versiones de Ionic, Angular y cordova que esten instalados correctamente ya que esto nos permitirá desarrollar la aplicación, para lo cual utilizamos el comando: ionic info.

![info](https://user-images.githubusercontent.com/49683650/105407219-6be4ae80-5bfb-11eb-9767-cb8886bbfc16.JPG)

Luego se procede a crear un nuevo proyecto en Firebase

![1fire](https://user-images.githubusercontent.com/49683650/105406323-43a88000-5bfa-11eb-9653-6bf19ce8bd8a.JPG)

Firebase requiere de algunas configuraciones, como necesitamos el proceso de autenticación en el aplicativo es ahi donde comenzaremos:

![2fire-deshabilitado](https://user-images.githubusercontent.com/49683650/105407546-dac20780-5bfb-11eb-8734-0245e917b87b.JPG)

Procedemos a habilitar el modo de autenticación que en este caso usamos correo electrónico con contraseña

![3habilitando](https://user-images.githubusercontent.com/49683650/105407759-1d83df80-5bfc-11eb-9c72-613ed94bf476.JPG)

Luego se puede ver que ya tenemos listo la configuración de  autenticación de firebase y para finalizar creamos una base en el Cloud de Firebase y en Storage ya que manejaremos imagenes.

![4correohabilitado](https://user-images.githubusercontent.com/49683650/105407782-2379c080-5bfc-11eb-8764-24fd1174f9dc.JPG)

Luego procedemos a crear el proyecto con el comando: ionic start examen1_sg blank --type=angular e instalamos todas las librerias que se requieren con los siguientes comandos: npm install firebase @angular/fire --save (nos ayuda a integrar firebase a nuestro proyecto), npm install -g ionic cordova, npm install -g native-run, npm install -g cordova-res

![5proyectocreado](https://user-images.githubusercontent.com/49683650/105408557-1f01d780-5bfd-11eb-9904-c89105c6af0c.JPG)

Luego abrimos un editor de codigo que en este caso se usó Visual Code y nos ubicamos en el archivo environments.ts donde ubicaremos las credenciales de la base de datos de firebase que se obtienen de la configuración del proyecto

![credenciales](https://user-images.githubusercontent.com/49683650/105408609-2de88a00-5bfd-11eb-8e83-b0411e2baef4.JPG)

Luego procedemos a crear las páginas que necesitamos para nuestro proyecto para eso se uso los siguientes comandos: ionic generate page chat, ionic generate page dashnoard, ionic generate page login, ionic generate page register tambien se crea las carpetas de servicios y páginas y dentro de las mismas generamos paginas con los comandos: para pages (ionic generate page chat, ionic generate page login), y para la carpeta services (authenticate.service, chat.service, firebase.service) y con eso podemos pasar a codificar el archivo html del login.

![6htmllogin](https://user-images.githubusercontent.com/49683650/105408834-7d2eba80-5bfd-11eb-8c3f-3fa7787cce32.JPG)

Codificamos los métodos para el ingreso con correo electrónico y contraseña.

![7metodologeo](https://user-images.githubusercontent.com/49683650/105408875-8c156d00-5bfd-11eb-9140-1818ce52e3b6.JPG)

Luego codificamos el archivo html para la interface de registro de usuario.

![8htmlregister](https://user-images.githubusercontent.com/49683650/105408876-8cae0380-5bfd-11eb-8c8b-845078ba741a.JPG)

Y así mismo creamos los métodos para el registro de usuarios.

![9metodoregistrar](https://user-images.githubusercontent.com/49683650/105408877-8cae0380-5bfd-11eb-835c-12ff0e854fbe.JPG)

Como creamos el servicio de autenticación, realizamos validaciones necesarias para el registro y logeo.

![servicio autenticacion](https://user-images.githubusercontent.com/49683650/105410040-5cfffb00-5bff-11eb-85f6-f7c7cebe6d53.JPG)
![16registroexitoso](https://user-images.githubusercontent.com/49683650/105409796-fb3f9100-5bfe-11eb-8ba4-df544b414d37.JPG)
![ingresoexitoso](https://user-images.githubusercontent.com/49683650/105409798-fbd82780-5bfe-11eb-906a-989d2e4ea20b.JPG)

Configuramos las rutas necesarias para la dirección de botones

![rutas](https://user-images.githubusercontent.com/49683650/105409857-11e5e800-5bff-11eb-952a-4e7682abbaf1.JPG)

Y con el comando: ionic serve podemos visualizar ya las interfaces de logeo y registro

![interfacelogin](https://user-images.githubusercontent.com/49683650/105409876-19a58c80-5bff-11eb-8a67-cb9df78dcf90.JPG)
![interfaceregistro](https://user-images.githubusercontent.com/49683650/105409879-1a3e2300-5bff-11eb-82ff-d795dc3d12ff.JPG)

Luego codificamos los métodos que nos daran como servicio para el chat que incluye el envió de mensajes e imagenes, para esto requerimos de algunos comandos para instalar las librerias necesarias los cuales son: npm install firebase angularfire2 — save, ionic cordova plugin add cordova-plugin-telerik-imagepicker — variable, PHOTO_LIBRARY_USAGE_DESCRIPTION=”your usage message”, npm install — save @ionic-native/image-picker, ionic cordova plugin add cordova-plugin-crop, npm install — save @ionic-native/crop

![seervicio chat](https://user-images.githubusercontent.com/49683650/105410091-6f7a3480-5bff-11eb-9f0a-95bb5c37f116.JPG)
![servicio firebase](https://user-images.githubusercontent.com/49683650/105410093-6f7a3480-5bff-11eb-8206-62ca82e64221.JPG)

Luego localmente podemos ver que funciona la selección de una imagen para enviar dentro del chat

![seleccion imagen](https://user-images.githubusercontent.com/49683650/105410132-7bfe8d00-5bff-11eb-8cd1-23f11daaf912.JPG)

Y comprobamos en la base de datos de Firebase si guardan los mensajes.
![mensajes firebase](https://user-images.githubusercontent.com/49683650/105410159-86208b80-5bff-11eb-9503-8c8b827cfb16.JPG)

Y también el almacenamiento de imagenes en el Storage de Firebase

![imagen firebase](https://user-images.githubusercontent.com/49683650/105410162-86b92200-5bff-11eb-9845-6654f2618b50.JPG)

Se puede observar los usuarios que se han creado, para pruebas locales se creo el usuario: prueba@gmail.com

![usuario registrado](https://user-images.githubusercontent.com/49683650/105410213-9a648880-5bff-11eb-9fa6-6f2ebb34aa07.JPG)

Luego procedemos a generar la APK con el comando ionic cordova build android 

![apk hecha](https://user-images.githubusercontent.com/49683650/105412890-53789200-5c03-11eb-8565-8f36e877d399.JPG)

Luego instalamos en un celular Android para visualizar y ejecutar, asi podemos ver el inicio de la aplicación

![logincelular](https://user-images.githubusercontent.com/49683650/105410217-9afd1f00-5bff-11eb-9a3f-6a3fdbc2f99b.jpeg)

Pero para probar registramos un nuevo usuario: sam@gmail.com

![registro celular](https://user-images.githubusercontent.com/49683650/105410220-9afd1f00-5bff-11eb-803b-865b18eca971.jpeg)

Y entramos al chat de la apliació donde tenemos la opción de seleccionar una imagen.
![chatcelular](https://user-images.githubusercontent.com/49683650/105410224-9b95b580-5bff-11eb-83a1-3beccdbb0db4.jpeg)

La imagen se selelciona desde la memoria del celular como se nota.

![imagencelular](https://user-images.githubusercontent.com/49683650/105410221-9b95b580-5bff-11eb-88b7-54e0a8beef2c.jpeg)

# **REFERENCIAS DE APOYO PARA EL DESARROLLO DEL EXAMEN**

El desarrollo del examen fue basado en las clases impartidas durante el 1er bimestre del periodo 2020-B por el Ing. Juan Pablo Zaldumbide :man:, además se tuvo de apoyo los siguientes link encontrados en la web:

* Ionic 4 Login firebase por Email by Domini Code
https://www.youtube.com/watch?v=fow7fHNW4Fw

* README images in Github by Comic Book News with Dan Shahin
https://www.youtube.com/watch?v=nvPOUdz5PL4

* Chat con cifrado de mensajes
https://www.youtube.com/watch?v=eWQaAcTOSw8

* Deploy De Una Aplicación De Angular En Firebase by Urien Hernandez
https://codigofacilito.com/articulos/deploy-angular-firebase

* Ionic Themes by Gonza Di Giovanni
https://medium.com/learn-ionic-framework/c%C3%B3mo-subir-una-imagen-a-firebase-desde-una-aplicaci%C3%B3n-de-ionic-77b93f9d383b

# **VIDEO EXPLICATIVO**

Link YouTube: https://youtu.be/r0ySTc3QIz0 
