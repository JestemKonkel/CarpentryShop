# Web Application to work with a carpentryshop.
Offers a full control of selling products. Ability to creating orders with a view of cart. To projects from ended orders, user have to choose materials to complete them.


Project files structure:
    
    backend: 
        Contain Java Spring Boot project running on project managment software - Maven
        Based on MVC design pattern and endpoints works with Rest API standards 
        Database connection is realized with PostgreSQL via JDBC driver
        To communication with API use JPA Repository
    
    frontend:
        Contain React project based on JavaScript
        This is a full UI layer which works through axios with API (uses a address which is exposed from Spring Boot e.g localhost:8080)
        Look is mostly based on CoreUI

Specific details are in individual files

Few example photos of application design 



 - Dashboard view
![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/Dashboard.PNG)

- Create Form view
![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/ExampleCreatingForm.PNG)

- Update form view 
![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/ExampleUpdatingForm.PNG)

- Product managment view
![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/ProductManagment.PNG)

- Add to Order view
![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/AddingToOrder.PNG)

- Order view
  ![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/CartView.PNG)

- Job List view
![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/JobListView.PNG)

- Job detail and choosing materials view
![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/JobDetails.PNG)

- Supply maker view
![alt text](https://github.com/JestemKonkel/CarpentryShop/blob/main/photo/SupplyMaker.PNG)
