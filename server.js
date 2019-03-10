//imports app
import app from './app';
// sets the port to be 3001
app.set('port', 3001);

// invokes the listen method on app which takes a call back method as the first argument. 
// the callback invokes the get method on app and gets the port 
app.listen(app.get('port'), () => {
  //console logs the message 'App is running on 3001 (or the result of the first callback)
  console.log(`App is running on port: ${app.get('port')}`)
});