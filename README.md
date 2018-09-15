# postgre-sequelize-learn
Learning Sequelize wir postgreSQL

# API Examples

##POST - CREATE
`curl --data "name=Whisky&breed=annoying&age=3&sex=f" \        
http://LOCALHOST:3000/api/puppies
`

##PUT - UPDATE
`curl -X PUT --data "name=Hunter&breed=annoying&age=33&sex=m" \
http://localhost:3000/api/puppies/1
`

##DELETE
`
curl -X DELETE http://localhost:3000/api/puppies/1
`

##GET ALL
`
http://localhost:3000/api/puppies/
`

##GET BY ID
`
http://localhost:3000/api/puppies/1
`