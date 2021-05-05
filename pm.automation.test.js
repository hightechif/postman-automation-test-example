// CREATED
pm.test("Example Test Case - CREATED", function(){
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
pm.test("Example Test Case - UNAUTHORIZED", function(){
  var value = pm.collectionVariables.get("var_increment")
  pm.collectionVariables.set("var_increment", ++value)

  pm.sendRequest({
      url: pm.collectionVariables.get("url") + '/api/v1/example',
      method: 'POST',
      header: {
          'content-type': 'application/json'
          //'x-site-code': pm.environment.get("x-site-code")
      },
      body: {
          mode: 'raw',
          raw: JSON.stringify(
               {
                  "createdBy": "rfadhil",
                  "createdDate": "2021-05-03T15:54:17.390Z",
                  "email": pm.globals.get('email'),
                  "id": 0,
                  "lastModifiedBy": "rfadhil",
                  "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                  "name": "Ridhan Fadhilah",
                  "nik": "FDHL101"+pm.collectionVariables.get("var_increment"),
                  "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                  "previousNik": "string",
                  "status": "active",
                  "verified": true
              }
          )
      }
  }, function (err, res) {
      pm.expect(res).to.have.property('code', 401);//unauthorized http code
      pm.expect(res.json()).to.have.property('httpStatus','UNAUTHORIZED');
      pm.expect(res.json()).to.have.property('message','Full authentication is required to access this resource');
      console.info("UNAUTHORIZED : " + res.responseTime)
  });
})

// 3. Empty Name
pm.test("Example Test Case - Empty Name", function(){
  var value = pm.collectionVariables.get("var_increment")
  pm.collectionVariables.set("var_increment", ++value)
  
  pm.sendRequest({
      url: pm.collectionVariables.get("url") + '/api/v1/example',
      method: 'POST',
      header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
      },
      body: {
          mode: 'raw',
          raw: JSON.stringify(
              {
                  "createdBy": "rfadhil",
                  "createdDate": "2021-05-03T15:54:17.390Z",
                  "email": pm.globals.get('email'),
                  "id": 0,
                  "lastModifiedBy": "rfadhil",
                  "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                  "name": "",
                  "nik": "FDHL101"+pm.collectionVariables.get("var_increment"),
                  "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                  "previousNik": "string",
                  "status": "active",
                  "verified": true
              }
          )
      }
  }, function (err, res) {
      pm.expect(res).to.have.property('code', 400); // Bad Request
      pm.expect(res.json()).to.have.property('httpStatus',null);
      pm.expect(res.json()).to.have.property('message','nama tidak boleh kosong');
      console.info("Empty Name : " + res.responseTime)
  });
})

// 4. Empty NIK
pm.test("Example Test Case - Empty NIK", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": pm.globals.get('email'),
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": "",
                    "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','NIK tidak boleh kosong');
        console.info("Empty NIK : " + res.responseTime)
    });
})

// 5. NIK < 10 Character
pm.test("Example Test Case - NIK < 10 Character", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": pm.globals.get('email'),
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": ""+pm.collectionVariables.get("var_increment"),
                    "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','format NIK tidak sesuai');
        console.info("NIK < 10 Character : " + res.responseTime)
    });
})

// 6. Invalid NIK
pm.test("Example Test Case - Invalid NIK", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": pm.globals.get('email'),
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": 1+pm.collectionVariables.get("var_increment"),
                    "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','format NIK tidak sesuai');
        console.info("Invalid NIK : " + res.responseTime)
    });
})

// 7. Existing NIK
pm.test("Example Test Case - Existing NIK", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": pm.globals.get('email'),
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": "0190390494",
                    "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','NIK sudah digunakan');
        console.info("Negative Login Response : " + res.responseTime)
    });
})

// 8. Empty Email
pm.test("Example Test Case - Empty Email", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": "",
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": "FDHL101"+pm.collectionVariables.get("var_increment"),
                    "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','email tidak boleh kosong');
        console.info("Empty NIK : " + res.responseTime)
    });
})

// 9. Invalid Email
pm.test("Example Test Case - Invalid Email", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": "emailGadungan",
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": "FDHL101"+pm.collectionVariables.get("var_increment"),
                    "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','format email tidak sesuai');
        console.info("Empty NIK : " + res.responseTime)
    });
})

// 10. Existing Email
pm.test("Example Test Case - Existing Email", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": "dina@yopmail.com",
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": "FDHL101"+pm.collectionVariables.get("var_increment"),
                    "phone": "0812212206"+pm.collectionVariables.get("var_increment"),
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','email sudah digunakan');
        console.info("Negative Login Response : " + res.responseTime)
    });
})

// 11. Empty Phone
pm.test("Example Test Case - Empty Phone", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": pm.globals.get('email'),
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": "FDHL101"+pm.collectionVariables.get("var_increment"),
                    "phone": "",
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','No HP tidak boleh kosong');
        console.info("Negative Login Response : " + res.responseTime)
    });
})

// Invalid Phone (Char)
pm.test("Example Test Case - Invalid Phone (Char)", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": pm.globals.get('email'),
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": "FDHL101"+pm.collectionVariables.get("var_increment"),
                    "phone": "Ini No HP",
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','format NO HP tidak sesuai');
        console.info("Invalid Phone (Char) : " + res.responseTime)
    });
})

// Invalid Phone (Char)
pm.test("Example Test Case - Invalid Phone (Char)", function(){
    var value = pm.collectionVariables.get("var_increment")
    pm.collectionVariables.set("var_increment", ++value)

    pm.sendRequest({
        url: pm.collectionVariables.get("url") + '/api/v1/example',
        method: 'POST',
        header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer'+' '+pm.collectionVariables.get("jwt_token")
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(
                {
                    "createdBy": "rfadhil",
                    "createdDate": "2021-05-03T15:54:17.390Z",
                    "email": pm.globals.get('email'),
                    "id": 0,
                    "lastModifiedBy": "rfadhil",
                    "lastModifiedDate": "2021-05-03T15:54:17.390Z",
                    "name": "Ridhan Fadhilah",
                    "nik": "FDHL101"+pm.collectionVariables.get("var_increment"),
                    "phone": "Ini No HP",
                    "previousNik": "string",
                    "status": "active",
                    "verified": true
                }
            )
        }
    }, function (err, res) {
        pm.expect(res).to.have.property('code', 400); // Bad Request
        pm.expect(res.json()).to.have.property('httpStatus',null);
        pm.expect(res.json()).to.have.property('message','format NO HP tidak sesuai');
        console.info("Invalid Phone (Char) : " + res.responseTime)
    });
})
