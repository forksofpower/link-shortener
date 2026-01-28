# Link Shortener
A link shortening service built on .Net 10 and Angular.

## Deployment
### Docker-Compose
```shell
$ docker compose up --build
```

### 


#### Todo
- [ ] users/auth using Cognito
- [ ] replace in-memory db with DynamoDB (convert from relational)
- [ ] allow anon users to view all of their previous short links
- [ ] track clicks and aggregate totals for each link
- [ ] Cloudformation config