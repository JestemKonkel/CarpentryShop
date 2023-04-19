# Frontend
Technology stack:
- JavaScript/ React
- npm 
- CoreUI template


Project packages structure 

    index.js - main file which rendering App component
    App.js - root component directing to DefaultLayout
    layout/DefaultLayout - represent the whole design of app (Divided into three components
    - AppSidebar - side navbar which use AppSidebarNav to navigate between views
    - AppHeader - main navbar
    - AppContent - content of specific views)
    
    Views like in backend are grouped on category 
    There are a individual view for every functionality (There are in main readme)
    
    Service contains a JS methods that work with API (sends or fetch data through axios)
    They are called in the concrete views


