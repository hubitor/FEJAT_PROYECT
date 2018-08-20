ALTER TABLE usuario ADD CONSTRAINT usuario_pk           PRIMARY KEY (id_usuario);
ALTER TABLE usuario ADD CONSTRAINT rol_usuario_fk       FOREIGN KEY (id_rol)        REFERENCES rol(id_rol)          ON DELETE NO ACTION ON UPDATE NO ACTION;
