import React from "react";
import { Label, Card, Icon, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const likePost = () => {
    console.log("like post");
  };
  const commentPost = () => {
    console.log("comment post");
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
        <Card.Content extra>
          <Button as='div' labelPosition='right' onClick={likePost}>
            <Button color='teal' basic>
              <Icon name='heart' />
            </Button>
            <Label basic color='blue' pointing='left'>
              {likeCount}
            </Label>
          </Button>
          <Button as='div' labelPosition='right' onClick={commentPost}>
            <Button color='blue' basic>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>
              {commentCount}
            </Label>
          </Button>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
