# Backend 
Technology stack:
- Java 17 correto
- Spring Boot
- Maven
- JPA, JDBC, PostgreSQL
- Basic JUnit 5 test (src.test.java.com.project.carpentryshop)
- Tested with Postman


Project packages structure -> src.main.java.com.project.carpentryshop
    
    entity (packages with every entities group by category): 
        - Products contains models describes basic unit of work (Product - superclass, 
          ElementConstant, ElementLiquid, Project - subclass)
        - Additional to products is separate folder with enums class represent available category
        - Order collects classes responsible for order creation algorithms
        - JobComplementing is for resources entity which describe a materials to jobs
    Repo (packages with repository interfaces which is layer to database)
        Grouping is the same like with entity. This files contains every method that handle every 
        data exchange operation (HTTP protocol methods like POST, GET, PUT, DELETE)
    Api (central point where every functionality is shared for client side)
        Functionalities are methods with indicated HTTP action that are shared on specific URL 
        (e.g http://localhost:8080/api/project/addProject)
    
    
