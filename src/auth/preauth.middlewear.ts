import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './secret-keys/firebaseServiceAccount.json';
import { Response } from 'express';
//will be changed

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.private_key_id,
  clientX509CertUrl: serviceAccount.client_x509_cert_url,
};

@Injectable()
export class PreauthMiddlewear implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: 'https://dodgeball-6b19c.firebaseio.com',
    });
  }

  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      //console.log('lena-dev token', token.replace('Bearer ', ''));

      this.defaultApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodeToken) => {
          const user = {
            email: decodeToken.email,
            phoneNumber: decodeToken.phoneNumber,
          };
          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.log(error);
          this.accessDenied(req.url, res);
        });
    } else {
      this.accessDenied(req.url, res);
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access denied',
    });
  }
}
