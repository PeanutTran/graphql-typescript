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

        type Event {
            _id: ID!
            userId: ID
            events: [eventDetail]
        }

        type eventDetail {
          _id: ID!
          postId: ID
          type: String
          description: String
          isRead: Boolean
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
        }

        type Post {
          _id: ID!
          text: String
          name: String
          user: ID
          tags: [String]
          likes: [Like]
          comments: [Comment]
          date: Date
        }

        input SPost {
          name: String
          text: String
          startDate: Date
          page: String
          endDate: Date
        }

        type Demo {
          name: String
          posts: [TPost]
        }

        type TPost {
          name: String
          content: String
        }

        type RootQuery {
          users: [User]
          user(_id: ID!): User
          profiles: [Profile]
          profile(_id: ID!): Profile
          event: Event
          posts: [Post]
          searchPosts(filter: SPost): [Post]
          post(_id: ID!): Post
          demos: Demo
          demo(id: Int): Demo
        }

        input postInput {
          text: String!
          tags: [String]
        }

        input postUpdateInput {
          text: String!
        }

        input postDeleteInput {
          _id: ID!
        }

        input Experience {
          _id: ID
          title: String
          company: String
          location: String
          from: String
          current: Boolean
          description: String
        }

        input Education {
          _id: ID
          school: String
          degree: String
          fieldofstudy: String
          from: String
          to: String
          description: String
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
          experience: [Experience]
          education: [Education]
        }

        type MutationResponse {
          _id: ID
        }

        type ResponseMsg {
          msg: String
        }

        type Mutation {
          storePost(input: postInput): Post
          updatePost(postId: ID!, input: postUpdateInput): Post
          destroyPost(postId: ID!): Post
          storePostLike(postId: ID!): MutationResponse
          destroyPostLike(postId: ID!): MutationResponse
          toggleLike(postId: ID!): Post
          destroyArrPost(postIds: [ID!]): ResponseMsg
          storeComment(postId: ID!, input: postUpdateInput): Post
          updateComment(postId: ID!, commentId: ID!, input: postUpdateInput): MutationResponse
          destroyComment(postId: ID!, commentId: ID!): MutationResponse
          storeProfile(input: profileInput): Profile
          destroyProfile(profileId: ID!): Profile
        }

        type Subscription {
          commentAdded(postId: ID!): Comment
        }

        schema {
            query: RootQuery
            mutation: Mutation
            subscription: Subscription
        }
  `);
