// 1. CREATED
pm.test("Example Test Cases - CREATED", function () {
    pm.response.to.be.success;
    pm.response.to.be.withBody;
    pm.response.to.be.json;
}, function (err, res) {
    pm.expect(res).to.have.property('code', 201);
    pm.expect(res.json()).to.have.property('status', '01');
    pm.expect(res.json()).to.have.property('httpStatus', 'CREATED');
    pm.expect(res.json()).to.have.property('message', 'success')
})

// 2. UNAUTHORIZED
pm.test("Example Test Cases - UNAUTHORIZED", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json'
            //'x-site-code': pm.environment.get("x-site-code")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 401); // Unauthorized
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', 'UNAUTHORIZED');
        pm.expect(res.json()).to.have.property('message', 'Full authentication is required to access this resource');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("UNAUTHORIZED : " + res.responseTime)
    });
})

// 3. Empty Name
pm.test("Example Test Cases - Empty Name", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'nama tidak boleh kosong');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Empty Name : " + res.responseTime)
    });
})

// 4. Empty NIK
pm.test("Example Test Cases - Empty NIK", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "",
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'NIK tidak boleh kosong');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Empty NIK : " + res.responseTime)
    });
})

// 5. NIK < 10 Character
pm.test("Example Test Cases - NIK < 10 Character", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NIK tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("NIK < 10 Character : " + res.responseTime)
    });
})

// 6. Invalid NIK
pm.test("Example Test Cases - Invalid NIK", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": 1 + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NIK tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Invalid NIK : " + res.responseTime)
    });
})

// 7. Existing NIK
pm.test("Example Test Cases - Existing NIK", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "0190390494",
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'NIK sudah digunakan');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Existing NIK : " + res.responseTime)
    });
})

// 8. Empty Email
pm.test("Example Test Cases - Empty Email", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": "",
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'email tidak boleh kosong');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Empty Email : " + res.responseTime)
    });
})

// 9. Invalid Email
pm.test("Example Test Cases - Invalid Email", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": "emailGadungan",
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format email tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Invalid Email : " + res.responseTime)
    });
})

// 10. Existing Email
pm.test("Example Test Cases - Existing Email", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": "dina@yopmail.com",
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'email sudah digunakan');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Existing Email : " + res.responseTime)
    });
})

// 11. Empty Phone
pm.test("Example Test Cases - Empty Phone", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "",
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'No HP tidak boleh kosong');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Empty Phone : " + res.responseTime)
    });
})

// 12. Invalid Phone (Char)
pm.test("Example Test Cases - Invalid Phone (Char)", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "Ini No HP",
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NO HP tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Invalid Phone (Char) : " + res.responseTime)
    });
})

// 13. Phone < 3 Number
pm.test("Example Test Cases - Phone < 3 Number", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "08",
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NO HP tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Phone < 3 Number : " + res.responseTime)
    });
})

// 14. Phone Not Start With 08
pm.test("Example Test Cases - Phone Not Start With 08", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "711220123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NO HP tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Phone Not Start With 08 : " + res.responseTime)
    });
})

// 15. Existing Phone
pm.test("Example Test Cases - Existing Phone", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "0871872234",
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'No HP sudah digunakan');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Existing Phone : " + res.responseTime)
    });
})

// 16. Status Inactive
pm.test("Example Test Cases - Status Inactive", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "inactive",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 201); // Created
        pm.expect(res.json()).to.have.property('status', '01');
        pm.expect(res.json()).to.have.property('httpStatus', "CREATED");
        pm.expect(res.json()).to.have.property('message', 'success');
        pm.expect(res.json().data).to.have.property('status', 'inactive')
        console.info("Status Inactive : " + res.responseTime)
    });
})

// 17. Invalid Status
pm.test("Example Test Cases - Invalid Status", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "random",
                "verified": true
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Created
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'invalid option');
        pm.expect(res.json()).to.have.property('data', null)
        console.info("Invalid Status : " + res.responseTime)
    });
})

// 18. Unverified Account
pm.test("Example Test Cases - Unverified Account", function () {
    var value = pm.collectionVariables.get("var_increment");
    value++
    pm.collectionVariables.set("var_increment", value);

    const uuid = require('uuid')
    let email = uuid() + '@domain.com'
    pm.globals.set('email', email)
    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer' + ' ' + pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                "createdBy": "rfadhil",
                "createdDate": pm.globals.Now,
                "email": pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "Ridhan Fadhilah",
                "nik": "101RDHN" + pm.collectionVariables.get("var_increment"),
                "phone": "081222123" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": false
            })
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 201); // Created
        pm.expect(res.json()).to.have.property('status', '01');
        pm.expect(res.json()).to.have.property('httpStatus', 'CREATED');
        pm.expect(res.json()).to.have.property('message', 'success');
        pm.expect(res.json().data).to.have.property('verified', false)
        console.info("Unverified Account : " + res.responseTime)
    });
})
