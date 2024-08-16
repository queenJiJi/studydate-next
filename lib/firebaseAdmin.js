var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) { // 안에 admin.initializeApp은 한번만 실행되어야해서 해당 if문을 통해 중복 initialize를 방지
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default admin;