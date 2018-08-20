CREATE TABLE estados_cuenta (
	id_asociado 	bigserial 		NOT NULL,
	identificacion_asociado varchar(100) 	NOT NULL,
	nombres_asociado 	varchar(100) 	NOT NULL,
	apellidos_asociado 	varchar(100) 	NOT NULL,
	aportes_solidarios 	bigint 	        NOT NULL,
	ahorro_asociado 	bigint 	        NOT NULL,
	valor_credito_asociado 	bigint 	        NOT NULL,
	cuotas_credito_asociado bigint 	        NOT NULL,
	valor_pendiente_credito_asociado bigint NOT NULL
);