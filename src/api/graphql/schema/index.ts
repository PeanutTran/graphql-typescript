import { buildSchema } from 'graphql';

export const graphQlSchema = buildSchema(`
        scalar Date

        type User {
            _id: ID!
            name: String
            email: String!
            password: String!
            avatar: String!
            date: Date
        }

        type Profile {
          _id: ID!
          bio: String
          githubusername: String
          location: String
          status: String
          website: String
          date: Date
        }

        type Comment {
          _id: ID!
          text: String
          name: String
          avatar: String
          date: Date
        }

        type Like {
          _id: ID!
          user: ID!
          type: String
        }

        type Post {
          _id: ID!
          text: String
          name: String
          likes: [Like]
          comments: [Comment]
          date: Date
        }

        type RootQuery {
          users: [User]
          user(_id: ID!): User
          profiles: [Profile]
          profile(_id: ID!): Profile
          posts: [Post]
          post(_id: ID!): Post
        }

        input postInput {
          text: String!
        }

        input postUpdateInput {
          text: String!
        }

        input postDeleteInput {
          _id: ID!
        }

        input likeInput {
          _id: ID
          type: String!
        }

        input profileInput {
          status: String!
          skills: String!
          website: String
          location: String
          bio: String
          githubusername: String
          twitter: String
          facebook: String
          youtube: String
        }

        type MutationResponse {
          _id: ID
        }

        type Mutation {
          storePost(input: postInput): Post
          updatePost(postId: ID!, input: postUpdateInput): Post
          destroyPost(postId: ID!): Post
          storePostLike(postId: ID!, input: likeInput): MutationResponse
          destroyPostLike(postId: ID!): MutationResponse
          storeComment(postId: ID!, input: postUpdateInput): MutationResponse
          updateComment(postId: ID!, commentId: ID!, input: postUpdateInput): MutationResponse
          destroyComment(postId: ID!, commentId: ID!): MutationResponse
          storeProfile(input: profileInput): Profile
          destroyProfile(profileId: ID!): Profile
        }

        schema {
            query: RootQuery,
            mutation: Mutation
        }
  `);
