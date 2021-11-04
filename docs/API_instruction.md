<h1>API_Instruction</h1>

**Function:api/projects/post**<br>
**Description**: When a new project is created, insert the information of new project into the table “project”<br>
**Inputs**:
- ProjectName 
- ProjectEndDate 
- ProjectTeamSize 
- Budget 
- Tools 
- Priority
- IsAssignmentComplete：whether the project is assigned to employees

**Outputs**: None
<br>
<br>


**Function: api/projects/get**<br>
**Description**: Query all data stored in the table “Project”<br>
**Inputs**: None<br>
**Outputs**: 
- ProjectId 
- ProjectName 
- ProjectEndDate 
- ProjectTeamSize 
- Budget 
- Tools 
- Priority 
- IsAssignmentComplete：whether the project is assigned to employees
<br>
<br>

**Function: api/teams**<br>
**Description**: Query all data in the table”Team”<br>
**Inputs**: None<br>
**Outputs**: 
- MemberName 
- ProjectName
<br>
<br>


**Function: /search**<br>
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



**Function: application/get**<br>
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


**Function: applicationSummaryPage/get**<br>
**Description**: Show the application statistics of each company, using the table “job”<br>
**Inputs**: None<br>
**Outputs**: 
- companyName 
- Waiting 
- Offer 
- Rejected
<br>
<br>



**Function: application/post**<br>
**Description**: Writing a new application record.<br>
**Inputs**: 
- jobTitle 
- companyName 
- date 
- class
- id
**Outputs**: None
<br>
<br>



**Function: token/post**<br>
**Description**: When a new user is signing up, writing a new token record.<br>
**Inputs**: 
- email
- password

**Outputs**: None
<br>
<br>
