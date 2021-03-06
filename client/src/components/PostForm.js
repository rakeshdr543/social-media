import { useMutation, gql } from "@apollo/client";
import React from "react";
import { useForm } from "../util/hooks";
import { Button, Form } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
  });
  // const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
  //   variables: values,
  //   update(proxy, result) {
  //     const data = proxy.readQuery({
  //       query: FETCH_POSTS_QUERY,
  //     });
  //     data.getPosts = [result.data.createPost, ...data.getPosts];
  //     proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
  //     values.body = "";
  //   },
  // });
  function createPostCallback() {
    createPost();
  }
  return (
    <Form onSubmit={onSubmit}>
      <h2>Create Post</h2>
      <Form.Field>
        <Form.Input
          placeholder='Hi World!'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

// const CREATE_POST_MUTATION = gql`
//   mutation createPost($body: String!) {
//     createPost(body: $body) {
//       id
//       body
//       createdAt
//       username
//       likes {
//         id
//         username
//         createdAt
//       }
//       likeCount
//       comments {
//         id
//         body
//         username
//         createdAt
//       }
//     }
//   }
// `;

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
