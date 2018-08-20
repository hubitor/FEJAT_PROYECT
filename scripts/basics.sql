--Script para crear los menu de la aplicación en la base de datos fejat
INSERT INTO menu
    (nombre_menu, path_menu, estado_menu, menu_padre)
VALUES
    ('Administración','/administracion', true, null),--Menu 1
    ('Procesos Fondo','/procesosFondo', true, null),--Menu 2
    ('Reportes','/reportes', true, null),--Menu 3    
    ('Profile','/profile', true, null);--Menu 4
    

--Script para crear las tareas de la aplicación en la base de datos fejat
INSERT INTO tarea
    (nombre_tarea, path_tarea, estado_estado, id_menu)
VALUES
    ('Crear Usuarios', '/crearUsuarios', true, 1),
    ('Administrar Usuarios', '/administrarUsuarios', true, 1),
    ('Solicitar Prestamo', '/solicitarPrestamo', true, 2),
    ('Procesar Solicitud Prestamo', '/procesarSolicitudPrestamo', true, 2),
    ('Solicitar Auxilio', '/procesarSolicitudAuxilio', true, 2),
    ('Procesar Solicitud Auxilio', '/procesarSolicitudAuxilio', true, 2),
    ('Solicitud Retiro', '/solicitudRetiro', true, 2),
    ('Procesar Solicitud Retiro', '/procesarSolicitudRetiro', true, 2),
    ('Consultar estado solicitudes', '/estadoSolicitudes', true, 2),
    ('Cargar Archivo', '/cargarArchivoFondo', true, 3),
    ('Descargar Archivo', '/descargarArchivoFondo', true, 3),
    ('Estado de cuenta', '/estadoDeCuenta', true, 3),
    ('Cambiar Contraseña', '/cambiarContrasena', true, 4),
    ('Acerca de ', '/about', true, 4),
    ('Salir', '/logout', true, 4);
    

--Script para definir los roles de la aplicación en la base de datos fejat
INSERT INTO rol
    (nombre_rol, detalle_rol, estado_rol)
VALUES    
    ('Administrador', 'Administrador de todo el sistema', true),
    ('Asociado' , 'Asociado al fondo de empleados', true)
    

--Script para asociar los roles a las tareas de la aplicación en la base de datos fejat
INSERT INTO rol_tarea
    (id_rol, id_tarea)
VALUES 
    (1, 1),-- Tareas asignadas al rol Administrador
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (1, 11),
    (1, 12),      
    (1, 13),
    (1, 14),
    (1, 15),
    (2, 3),-- Tareas asignadas al rol Asociado
    (2, 5),
    (2, 7),
    (2, 11),
    (2, 12),
    (2, 13),
    (2, 14),
    (2, 15);

--Script para insertar usuarios en la base de datos fejat
INSERT INTO usuario 
(tipo_documento, numero_documento, nombres_usuario, apellidos_usuario, perfil_usuario, correo_usuario, login_usuario, password_usuario, estado_usuario, id_rol)
VALUES 
('CC','1030545398','JUAN CARLOS','JIMENEZ VARGAS',1,'jjimenezv24@gmail.com','admin','$2b$10$LjbMoneHFzv/DR0noOPN7uIkfZ7VvNxfvuzDrRMSvLSzmt6N1PSOS',1,1),
('CC','53074440','ROCIO','DUQUE TORRES',2,'rociodt18@hotmail.com','asociado1','$2b$10$LjbMoneHFzv/DR0noOPN7uIkfZ7VvNxfvuzDrRMSvLSzmt6N1PSOS',1,2);


--Script para insertar valores en la base de datos fejat
INSERT INTO estados_cuenta 
(identificacion_asociado, nombres_asociado,apellidos_asociado, aportes_solidarios, ahorro_asociado, valor_credito_asociado,cuotas_credito_asociado, valor_pendiente_credito_asociado)
VALUES
('1030545398', 'Juan Carlos','Jimenez Vargas', 780000, 100000, 1000000,10, 1000000)




