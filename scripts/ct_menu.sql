CREATE TABLE menu (
	id_menu 	bigserial 		NOT NULL,
	nombre_menu varchar(100) 	NOT NULL,
	path_menu 	varchar(100) 	NOT NULL,
	estado_menu boolean 		NOT NULL,
	menu_padre 	bigint
);