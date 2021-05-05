var value = pm.collectionVariables.get("var_increment");
pm.collectionVariables.set("var_increment", ++value);

const uuid = require('uuid')
let email=uuid()+'@domain.com'
pm.globals.set('email',email)