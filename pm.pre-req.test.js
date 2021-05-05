var value = pm.collectionVariables.get("var_increment");
value++
pm.collectionVariables.set("var_increment", value);

const uuid = require('uuid')
let email=uuid()+'@domain.com'
pm.globals.set('email',email)

const moment = require('moment');
pm.globals.set("Now", moment().format());