import React, { useEffect, useRef, useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import createAvatar from '../../../utils/createAvatar';
import { MAvatar, MIconButton } from '../../../components/@material-extend';
import QuestionView from './QuestionView';
import QuestionForm from './QuestionForm';
import Scrollbar from '../../../components/Scrollbar';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CREATE_VEHICLE_CONTACT,
  GET_VEHICLE_BY_ID,
  GET_VEHICLE_QUESTION,
  SEND_VEHICLE_QUESTION,
  SEND_VEHICLE_QUESTION_WITH_PARENT
} from '../../../graphql/Queries';

export default function Index({ id = 1 }) {
  const scrollRef = useRef();

  const [questions, setQuestions] = useState([]);

  const [getVehicleQuestions] = useLazyQuery(GET_VEHICLE_QUESTION, {
    variables: { id: id }
  });

  useEffect(() => {
    getVehicleQuestions().then((res) => {
      setQuestions(res?.data?.GetVehicleQuestions);
    });
  }, []);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [questions]);

  const [send, { loading: sendLoading }] = useMutation(SEND_VEHICLE_QUESTION);
  const [sendWithParent, { loading: sendWithParentLoading }] = useMutation(SEND_VEHICLE_QUESTION_WITH_PARENT);

  const sendQuestion = async (parentID, comment) => {
    if (parentID) {
      sendWithParent({ variables: { vehicleID: id, parentID: parentID, comment: comment, date: new Date() } })
        .then((res) => {
          getVehicleQuestions().then((res) => {
            setQuestions(res?.data?.GetVehicleQuestions);
          });
        })
        .catch(() => {
          getVehicleQuestions().then((res) => {
            setQuestions(res?.data?.GetVehicleQuestions);
          });
        });
    } else {
      await send({ variables: { vehicleID: id, comment: comment, date: new Date() } })
        .then((res) => {
          console.log(res);
          getVehicleQuestions().then((res) => {
            setQuestions(res?.data?.GetVehicleQuestions);
          });
        })
        .catch((e) => {
          console.log(e);
          getVehicleQuestions().then((res) => {
            setQuestions(res?.data?.GetVehicleQuestions);
          });
        });
    }
  };

  const getCommentsViews = (comments, marginIndex, parentID) => {
    return (
      <Stack spacing={1}>
        {comments?.map((comment, index) => (
          <div key={index}>
            <QuestionView
              host={id}
              commentData={comment}
              sendQuestion={sendQuestion}
              parentID={parentID}
              loading={sendWithParentLoading}
            />
            <Stack spacing={1} style={{ marginLeft: 40 * marginIndex, mb: 2 }}>
              {comment?.children?.length > 0 && getCommentsViews(comment?.children, marginIndex + 1, comment?.id)}
            </Stack>
          </div>
        ))}
      </Stack>
    );
  };

  return (
    <Stack spacing={2}>
      <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
        Questions & Answers
      </Typography>
      <QuestionForm
        buttonName="Post Question"
        placeholder="Enter your Question Here..."
        sendQuestion={sendQuestion}
        loading={sendLoading}
      />
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ my: 1, height: 1, maxHeight: 400 }}>
        {getCommentsViews(questions, 1)}
      </Scrollbar>
    </Stack>
  );
}
