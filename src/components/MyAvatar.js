// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar src={user.photoURL} alt={user.firstName} {...other}>
      {createAvatar(user.firstName).name}
    </MAvatar>
  );
}
