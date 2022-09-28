import { MAvatar } from '../../../components/@material-extend';
import createAvatar from '../../../utils/createAvatar';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function MessageAvatar({ user, ...other }) {
  const { photoURL, name } = user;
  const theme = useTheme();

  return (
    <MAvatar src={photoURL} alt={name} color={photoURL ? 'default' : createAvatar(name).color} {...other}>
      {createAvatar(name).name}
    </MAvatar>
  );
}
