import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import {GET_USER_ACTIVITIES} from "../queries/query";
import {addUser} from "../redux/actions/actionCreator";
import { IUserState } from "../redux/reducers/userReducer";

export const fetchUserActivities = async (
  email: string,
  user: IUserState,
  dispatch: Dispatch<any>,
) => {
  const activities = await API.graphql(
    graphqlOperation(GET_USER_ACTIVITIES, {email}),
  );

  // @ts-ignore
  const reqdData = activities.data.getUser.userActivity.items || [];

  dispatch(addUser({...user, activities: reqdData}));
};
