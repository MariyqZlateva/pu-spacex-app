const axios = require('axios');


const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

//Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        id:{type: GraphQLString},
        flight_number: {type: GraphQLInt},
        name: {type: GraphQLString},
        date_local: {type: GraphQLString},
        success: {type: GraphQLBoolean},
        rocket: {type: GraphQLString}
    })
});

//Rocket Type
// const RocketType = new GraphQLObjectType({
//     name: 'Rocket',
//     fields: () => ({
//         rocket_id: {type: GraphQLString},
//         rocket_name: {type: GraphQLString},
//         rocket_type: {type: GraphQLString}
//
//     })
// });

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v4/launches')
                    .then(response => response.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                id:{type: GraphQLString}
            },
            resolve(parent,args){
                return axios.get(`https://api.spacexdata.com/v4/launches/${args.id}`)
                    .then(response => response.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});


