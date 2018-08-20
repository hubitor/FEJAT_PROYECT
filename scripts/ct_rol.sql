CREATE TABLE rol (
	id_rol 		bigserial 		NOT NULL,
	nombre_rol 	varchar(250)	NOT NULL,
	detalle_rol text 			NOT NULL DEFAULT '',
	estado_rol 	boolean 		NOT NULL DEFAULT false
);