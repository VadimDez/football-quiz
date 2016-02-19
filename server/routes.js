/**
 * Created by Vadym Yatsyuk on 19/02/16
 */

"use strict";

module.exports = function (app) {
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get((req, res) => {
      res.json('Forbidden', 403);
    });

  app.route('/*')
    .get((req, res) => {
      res.json('Forbidden', 403);
    });
}