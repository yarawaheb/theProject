const jwt = require('jsonwebtoken');

const jwtKey = 'my_secret_key';
const jwtExpiryTimeInMilliSeconds = 1000 * 60 * 1500; // 15 min

const refresh = (req, res) => {
    console.log("going to try to refresh the token (if there is one and it is still valid");
  
    let statusCode = 200 // OK
    const token = req.cookies.token;
  
    if (!token) {
      console.log('refresh - couldnt find token in cookies');
      statusCode = 401;
      return statusCode;
    }
  
    let payload;
    try {
      payload = jwt.verify(token, jwtKey);
    }
    catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        statusCode = 401
        return statusCode;
      }
      console.log('refresh - JsonWebTokenError ', e);
      statusCode = 400;
      return statusCode;
    }
  
    // Once we got here it means the token was checked and is valid
  
  
  
    // Now, create a new token for the current user, 
    //   with a renewed expiration time
    const newToken = jwt.sign({ username: payload.username }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpiryTimeInMilliSeconds
    })
  
    // Set the new token as the users `token` cookie
    console.log(`the new refreshed token - ${newToken}`);
    res.cookie('token', newToken, { maxAge: jwtExpiryTimeInMilliSeconds })
    res.thePayload = payload;
    // once we got here it means the statusCode is still 200 (as we initialized to be)
    return statusCode; // returning 200
  
  }
  //=======================================================
  
  
  module.exports = refresh;
  
  