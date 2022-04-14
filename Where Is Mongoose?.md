## Direct references to Mongoose (Therefore MongoDB)

### www

VAR?! what language is www written in?

- looks like js but legacy
- there is a connection here

### post.js

Model => schema declaration
`const Post = mongoose.model("Post", PostSchema);`
This is the line that turns PostSchema (a required way of declaring a schema?) into the class Post that is used elsewhere in the code

### user.js

Model => schema declaration
As for Post above but with UserSchema => User

## Testing Usage of Mongoose

The test files connect to a local test_database

- the mongodb_helper sets up the connection to the database that is then used by the individual spec files
- the specific collection being tested is dropped before eahc test is run to start with a clean collection (noSQL equivalent of table possibly)
- example spec files use multiple assertions per test -> not a problem for me but need to **check with team**

### mongodb_helper.js

_var used_
Demonstration of a mongoose.connect() followed by reference to a mongoose.connection object that then seems to have all the collections in it

- **should print this object to inspect**
  - what properties does it have?
  - what methods can be called on it?
    - close()?

### post.spec.js

_var used_
the mongoose.connection is created in mongodb_helper.js

### user.spec.js

_var not used_

## Indirect Mongoose References

Markdown Table?

| file | reference |
| www | MONGODB_URL and PORT can be passed as environment variables |
| www | db is set to mongoose.connection and then referred to from then on |
