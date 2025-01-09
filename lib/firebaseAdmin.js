var admin = require("firebase-admin");

// var serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) { // 안에 admin.initializeApp은 한번만 실행되어야해서 해당 if문을 통해 중복 initialize를 방지
    admin.initializeApp({
        // credential: admin.credential.cert(serviceAccount),
        // credential: admin.credential.applicationDefault(),
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // 줄바꿈 처리
            privateKeyID: process.env.FIREBASE_PRIVATE_KEY_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
        storageBucket: `gs://react-auth-test-a8fe3.appspot.com`
    });
}

export default admin;