CREATE TABLE tarea (
	id_tarea 		bigserial 		NOT NULL,
	nombre_tarea 	varchar(100) 	NOT NULL,
	path_tarea 		varchar(250) 	NOT NULL,
	estado_estado	boolean 		NOT NULL,
	id_menu 		bigint 			NOT NULL
);