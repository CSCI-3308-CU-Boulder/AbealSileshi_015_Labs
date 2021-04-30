DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE IF NOT EXISTS reviews (
  id serial,
  tv_show VARCHAR(50) NOT NULL,       /* Name of the visiting team                     */
  review VARCHAR(200) NOT NULL,
  review_date VARCHAR(90), 
  PRIMARY KEY(id) /* A game's unique primary key consists of the visitor_name & the game date (this assumes you can't have multiple games against the same team in a single day) */
);


INSERT INTO reviews(tv_show, review, review_date)
VALUES('CU Boulder: The Movie', 'This movie makes everyone want to go to CU!', CURRENT_TIMESTAMP),
('Colombia: La Pelicula', 'Voy a regresar a Barranquilla de nuevo, gracias a Dios!', CURRENT_TIMESTAMP);

