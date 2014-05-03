'use strict';

module.exports = Query;

function Query(){
}

Query.execute = function(query, fn){
  fn();
};
