# Canteen Portal 

Features:

##### FOR VENDOR
- lets a vendor register/login into the portal
- vendor can list down the food menu he/she/they sell
- vendor can tract down the progress of an order from "order placed" to "ready to pickup" and can even reject an order if required
- vendor can manage the orders 


##### FOR CUSTOMER
- lets a customer to register/login into the portal
- customer can order from food menu listed by different vendors
- customer can add money to his/her/their wallet for purchasing an item (no payment gateway for now, its just a dummy wallet feature)
- customer can rate a food item based on the experience





## Installations


### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


## Running the WebApp

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

