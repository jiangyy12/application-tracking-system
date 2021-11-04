<h1>API_Instruction</h1>

**Function: /search**<br>
**Method:get**<br>
**Description**: Return the search results from Google using the keywords user input.<br>
**Inputs**:
- Keywords

**Outputs**: 
- index
- jobTitle
- companyName
- location
<br>
<br>



**Function: /application**<br>
**Method:get**<br>
**Description**: Get all data stored in the table “job”, "users" and "application"<br>
**Inputs**: None<br>
**Outputs**: 
- jobTitle 
- companyName 
- date 
- class
- id
<br>
<br>


**Function: /applicationSummaryPage**<br>
**Method:get**<br>
**Description**: Show the application statistics of each company, using the table “job”<br>
**Inputs**: None<br>
**Outputs**: 
- companyName 
- Waiting: the number of application in the status "Waiting"
- Offer: the number of application in the status "Offer"
- Rejected: the number of application in the status "Rejected"
<br>
<br>


**Function: /school**<br>
**Method:get**<br>
**Description**: Get all data stored in the table “program”, "users" and "school"<br>
**Inputs**: None<br>
**Outputs**: 
- programTitle
- schoolName
- date 
- class
- id
<br>
<br>



**Function: /application**<br>
**Method:post**<br>
**Description**: Writing a new application record.<br>
**Inputs**: 
- programTitle
- schoolName
- date 
- class
- id

**Outputs**: None
<br>
<br>


**Function: /school**<br>
**Method:post**<br>
**Description**: Writing a new school application record.<br>
**Inputs**: 
- jobTitle 
- companyName 
- date 
- class
- id

**Outputs**: None
<br>
<br>


**Function: token**<br>
**Method:post**<br>
**Description**: When a new user is signing up, writing a new token record.<br>
**Inputs**: 
- email
- password

**Outputs**: None
<br>
<br>
