ALTER TABLE rol_tarea ADD   CONSTRAINT pk_rol_tarea PRIMARY KEY (id_rol, id_tarea);
ALTER TABLE rol_tarea ADD   CONSTRAINT rol_fk       FOREIGN KEY (id_rol)    REFERENCES rol(id_rol)      ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE rol_tarea ADD   CONSTRAINT tarea_fk     FOREIGN KEY (id_tarea)  REFERENCES tarea(id_tarea)  ON DELETE NO ACTION ON UPDATE NO ACTION;