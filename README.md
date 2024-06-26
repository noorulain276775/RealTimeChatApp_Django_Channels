# Chatting APP for chatting with the bot 
The backend in Django RestFramework where have setup Django channels and built our APIs for authentication.
We have consumed these APIs in Reactjs application and connected to our Django channels through websockets in our reactjs.


# Custom Middleware
Django Channels supports standard Django authentication out-of-the-box for HTTP and WebSocket consumers. However, it does not support different authentication schemes like token-based authentication. In our project, we are using token-based authentication. To handle this, we need to write our own custom middleware. Otherwise, `self.scope['user']` will always return an Anonymous user.


#### The system uses 
Python 3.119 <br>
Django 5.0.6


### MySQL Client in Django
pip install ez_setup <br>
sudo apt-get install python3-dev default-libmysqlclient-dev build-essential

#### Now install
python3 -m pip install mysqlclient


#### if still error is there 
pip cache purge <br>
python3 -m pip install mysqlclient


### Insalling dotenv
python -m pip install python-dotenv


