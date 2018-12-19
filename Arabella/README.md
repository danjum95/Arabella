# API ENDPOINTS

### Users - `/api/users`

METHOD (APPEND TO PATH) - REQUIRE PARAMS (VALIDATION TYPE) - DESCRIPTION

`PUT` - [User](src/main/java/arabella/backend/model/User.java)(group = New.class) - add user to DB abd returns `Token`

`GET` (`/user/info`) - Header `Token` - Returns info about user which use given `Token`

`GET` (`/{id}`) - None (temporary) - Shows DB information about user of given `id`

`GET` (`/which/type/of/user`) - Header `Token` - Returns user type in given school 

`GET` (`/which/school`) - Header `Token` - Retruns `id` of `school` 

`POST` (`/change/password`) - Header `Token`, [User](src/main/java/arabella/backend/model/User.java) (only password field) - Changes password if not the same

`POST` (`/change/email`) - Header `Token`, [User](src/main/java/arabella/backend/model/User.java) (only email field) - Changes email if not the same and new email not already used 

### Students - `/api/students`

`GET` (`/of/school/{schoolId}`) - Header `Token` - Returns list of students of given school if user is `Instructor` or `School owner` for given school

### Instructors `/api/instructors`

`GET` (`/of/school/{schoolId}`) - Header `Token` - Returns list of instructors of given school if user is `Student` `Instructor` or `School owner` for given school

### Login - `/api/login`

`POST` - [User](src/main/java/arabella/backend/model/User.java) (Only `email`, `password`) - Returns `token` if logged

### Messages - `/api/messages`

`PUT` - Header `Token`, [Message](src/main/java/arabella/backend/model/Message.java) (annotations) - Sends message

`GET` - Header `Token` - Returns user messages

`GET` (`/users`) - Header `Token` - Returns list of user to which given user can send messages  `// needs improvement`

### Contracts - `/api/contract`

`GET` - Header `Token` - Returns list of contracts to given `school` if owner of `school` or contract  if `user`

`PUT` (`/change/status/of/{contractId}`) - Header `Token`, [Contract](src/main/java/arabella/backend/model/School.java) (annotation) - It changes status of contract, if status ACCEPTED then makes given `user` a `student` 

`PUT` (`/student/of/school/{schoolId}`) - Header `Token` - Creates `contract` to accept by `school` and returns that `contract`

`PUT` (`/instructor/of/school/{schoolId}`) - Header `Token` - If user is neither `student`, `instructor`, `owner` of given school then he became a `instructor`

### Schools - `/api/schools`

`PUT` - Header `Token`, [School](src/main/java/arabella/backend/model/School.java) (group = Add.class) - Creates school for given user if doesn't has already

`GET` - None - Returns all schools

### Lessons - `/api/lessons`

`PUT` - Header `Token`, [Lesson](src/main/java/arabella/backend/model/Lesson.java)(annotations) - add lesson

`GET` (`/of/school/{schoolId}`) - Header `Token` - Returns lessons depending on type of user, `owner` see all lessons

### Maps - `/api/maps`

`GET` (`/{lessonId}`) - None - Show given lesson's map if exists

`PUT` - [Map](src/main/java/arabella/backend/model/Map.java)

# IGNORED FILES

.gradle
/build/
!gradle/wrapper/gradle-wrapper.jar

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr
/out/

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/