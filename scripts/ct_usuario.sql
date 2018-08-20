CREATE TABLE usuario (
	id_usuario					bigserial 		NOT NULL,
	tipo_documento				varchar(2)    NOT NULL,
	numero_documento			varchar(100) 	NOT NULL,
	nombres_usuario 			varchar(250) 	NOT NULL,
	apellidos_usuario 			varchar(250) 	NOT NULL,	
	perfil_usuario      	    bigint      	NOT NULL,
	correo_usuario      	    varchar(250)	NOT NULL,
	login_usuario       	    varchar(17)	    NOT NULL,
	password_usuario    	    varchar(100)    NOT NULL,
	estado_usuario 				bigint 			NOT NULL,
	id_rol 						bigint 			NOT NULL
);