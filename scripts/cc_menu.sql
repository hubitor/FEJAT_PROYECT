ALTER TABLE menu ADD CONSTRAINT menu_pk         PRIMARY KEY (id_menu);
ALTER TABLE menu ADD CONSTRAINT menu_padre_fk   FOREIGN KEY (menu_padre)    REFERENCES menu(id_menu)    ON DELETE NO ACTION ON UPDATE NO ACTION;
