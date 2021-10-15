import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

class Conector {
  constructor(options){
    this.apikey = options.apikey;
    this.authDomain = options.authDomain;
    this.databaseURL = options.databaseURL;
    this.projectId = options.projectId;
    this.storageBucket = options.storageBucket;
    this.messagingSenderId = options.messagingSenderId;
    this.appId = options.appId;
    this.measurementId = options.measurementId;
    this.app;
  }


  generateApp(){
    const app = initializeApp({
      apiKey : this.apikey,
      authDomain : this.authDomain,
      databaseURL : this.databaseURL,
      projectId : this.projectId,
      storageBucket : this.storageBucket,
      messagingSenderId : this.messagingSenderId,
      appId : this.appId,
      measurementId : this.measurementId
    });

    this.app = app;
  }

  /**
   * 
   * @param { String } email the email
   * @param { String } password the password
   * @returns 
   */

  loginWithEmail(email, password){
    try {
      
      const auth = getAuth(this.app);

      const user = await createUserWithEmailAndPassword(auth, email, password);
  
      return user;

    } catch (ex) {
      console.error(ex);
      return ex
    }
  }

  /**
   * 
   * @param { String } event event to show with analytics
   */

  analyticsReturn(event){
    
    const analytics = getAnalytics();

    logEvent(analytics, event);
  }
}

module.exports = { Conector };