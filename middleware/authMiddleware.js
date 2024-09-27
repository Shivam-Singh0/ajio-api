import admin from 'firebase-admin';

import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };;


admin.initializeApp({

  credential: admin.credential.cert(serviceAccount)

});


const authenticateUser = async (req, res, next) => {
  try {


    // Extract the token from the Authorization header
    const token =  req.headers.authorization?.split('Bearer ')[1];


    if (!token) {
      return res.status(403).json({ message: 'No token provided, Unauthorized' });
    }

    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach the user info to the request object
    req.user = decodedToken;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ message: 'Invalid token, Unauthorized' });
  }
};

export default authenticateUser;
