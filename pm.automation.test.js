// 1. CREATED
pm.test("Example Test Case - CREATED", function () {
    pm.response.to.be.success;
    pm.response.to.be.withBody;
    pm.response.to.be.json;
}, function (err, res) {
    console.info("CREATED : " + res.responseTime)
    pm.expect(res).to.have.property('code', 201);
    pm.expect(res.json()).to.have.property('status', '01');
    pm.expect(res.json()).to.have.property('httpStatus', 'CREATED');
    pm.expect(res.json()).to.have.property('message', 'success')
})

// 2. UNAUTHORIZED
pm.test("Example Test Case - UNAUTHORIZED", function () {
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
                "email": "email02" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "102AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "081220102" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("UNAUTHORIZED : " + res.responseTime)
        pm.expect(res).to.have.property('code', 401); // Unauthorized
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', 'UNAUTHORIZED');
        pm.expect(res.json()).to.have.property('message', 'Full authentication is required to access this resource');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 3. Empty Name
pm.test("Example Test Case - Empty Name", function () {
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
                "email": "email03" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "",
                "nik": "103AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "081220103" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Empty Name : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'nama tidak boleh kosong');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 4. Empty NIK
pm.test("Example Test Case - Empty NIK", function () {
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
                "email": "email04" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "",
                "phone": "081220104" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Empty NIK : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'NIK tidak boleh kosong');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 5. NIK < 10 Character
pm.test("Example Test Case - NIK < 10 Character", function () {
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
                "email": "email05" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "105XX" + pm.collectionVariables.get("var_increment"),
                "phone": "081220105" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("NIK < 10 Character : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NIK tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 6. NIK > 10 Character
pm.test("Example Test Case - NIK > 10 Character", function () {
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
                "email": "email06" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "106AUTOXXXXXX" + pm.collectionVariables.get("var_increment"),
                "phone": "081220106" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("NIK > 10 Character : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NIK tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 7. Invalid NIK
pm.test("Example Test Case - Invalid NIK", function () {
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
                "email": "email07" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": 1 + pm.collectionVariables.get("var_increment"),
                "phone": "081220107" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Invalid NIK : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NIK tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 8. Existing NIK
pm.test("Example Test Case - Existing NIK", function () {
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
                "email": "email08" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "0190390494",
                "phone": "081220108" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Existing NIK : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'NIK sudah digunakan');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 9. Empty Email
pm.test("Example Test Case - Empty Email", function () {
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
                "name": "AUTOTEST ENAM MEI",
                "nik": "109AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "081220109" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Empty Email : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'email tidak boleh kosong');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 10. Invalid Email
pm.test("Example Test Case - Invalid Email", function () {
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
                "name": "AUTOTEST ENAM MEI",
                "nik": "110AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "081220110" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Invalid Email : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format email tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 11. Existing Email
pm.test("Example Test Case - Existing Email", function () {
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
                "name": "AUTOTEST ENAM MEI",
                "nik": "111AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "081220111" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Existing Email : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'email sudah digunakan');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 12. Empty Phone
pm.test("Example Test Case - Empty Phone", function () {
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
                "email": "email12" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "112AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "",
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Empty Phone : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'No HP tidak boleh kosong');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 13. Invalid Phone (Char)
pm.test("Example Test Case - Invalid Phone (Char)", function () {
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
                "email": "email13" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "113AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "Ini No HP",
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Invalid Phone (Char) : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NO HP tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 14. Phone < 3 Number
pm.test("Example Test Case - Phone < 3 Number", function () {
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
                "email": "email14" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "114AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "08",
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Phone < 3 Number : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NO HP tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 15. Phone Not Start With 08
pm.test("Example Test Case - Phone Not Start With 08", function () {
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
                "email": "email15" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "115AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "711220115" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Phone Not Start With 08 : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'format NO HP tidak sesuai');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 16. Existing Phone
pm.test("Example Test Case - Existing Phone", function () {
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
                "email": "email16" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "116AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "0871872234",
                "previousNik": "string",
                "status": "active",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Existing Phone : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'No HP sudah digunakan');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 17. Status Inactive
pm.test("Example Test Case - Status Inactive", function () {
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
                "email": "email17" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "117AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "081220117" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "inactive",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Status Inactive : " + res.responseTime)
        pm.expect(res).to.have.property('code', 201); // Created
        pm.expect(res.json()).to.have.property('status', '01');
        pm.expect(res.json()).to.have.property('httpStatus', "CREATED");
        pm.expect(res.json()).to.have.property('message', 'success');
        pm.expect(res.json().data).to.have.property('status', 'inactive')
    });
})

// 18. Invalid Status
pm.test("Example Test Case - Invalid Status", function () {
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
                "email": "email18" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "118AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "081220118" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "random",
                "verified": true
            })
        }
    }, function (err, res) {
        console.info("Invalid Status : " + res.responseTime)
        pm.expect(res).to.have.property('code', 400); // Created
        pm.expect(res.json()).to.have.property('status', '03');
        pm.expect(res.json()).to.have.property('httpStatus', null);
        pm.expect(res.json()).to.have.property('message', 'invalid option');
        pm.expect(res.json()).to.have.property('data', null)
    });
})

// 19. Unverified Account
pm.test("Example Test Case - Unverified Account", function () {
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
                "email": "email19" + pm.globals.get('email'),
                "id": 0,
                "lastModifiedBy": "rfadhil",
                "lastModifiedDate": pm.globals.Now,
                "name": "AUTOTEST ENAM MEI",
                "nik": "119AUTO" + pm.collectionVariables.get("var_increment"),
                "phone": "081220119" + pm.collectionVariables.get("var_increment"),
                "previousNik": "string",
                "status": "active",
                "verified": false
            })
        }
    }, function (err, res) {
        console.info("Unverified Account : " + res.responseTime)
        pm.expect(res).to.have.property('code', 201); // Created
        pm.expect(res.json()).to.have.property('status', '01');
        pm.expect(res.json()).to.have.property('httpStatus', 'CREATED');
        pm.expect(res.json()).to.have.property('message', 'success');
        pm.expect(res.json().data).to.have.property('verified', false)
    });
})
