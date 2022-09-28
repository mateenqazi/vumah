import { MAvatar } from '../../../components/@material-extend';
import createAvatar from '../../../utils/createAvatar';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function MessageAvatar({ user, ...other }) {
  const { avatarUrl, firstName } = user;

  return (
    <MAvatar src={avatarUrl} alt={firstName} {...other}>
      {createAvatar(firstName).firstName}
    </MAvatar>
  );
}
