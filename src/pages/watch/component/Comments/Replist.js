import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, ListItem } from '@mui/material';

import * as actions from '~/store/actions';
import CommentItem from './CommentItem';

function Replist({ itemParent, replist, resPostCmtRep, cmtDeleted }) {
  return (
    <>
      <List className="contents">
        {replist &&
          replist.comments.length > 0 &&
          replist.comments.map((item, index) => {
            const isDeleted = cmtDeleted.includes(item.id);
            return isDeleted ? (
              <Fragment key={index}></Fragment>
            ) : (
              <ListItem className="comment-thread" key={index}>
                <CommentItem item={item} isRep={true} />
              </ListItem>
            );
          })}

        {resPostCmtRep &&
          resPostCmtRep.map((comment, index) => {
            const isDeleted = cmtDeleted.includes(comment.id);
            return (
              comment.snippet.parentId === itemParent?.id &&
              (isDeleted ? (
                <Fragment key={index}></Fragment>
              ) : (
                <ListItem className="comment-thread" key={index}>
                  <CommentItem item={comment} isRep={true} />
                </ListItem>
              ))
            );
          })}
      </List>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    resPostCmtRep: state.video.resPostCmtRep,
    cmtDeleted: state.video.cmtDeleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Replist);
