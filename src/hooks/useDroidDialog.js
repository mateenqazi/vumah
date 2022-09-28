import { useContext } from 'react';
import { DroidDialogContext } from '../contexts/WebDroidDialog';

const useDroidDialog = () => useContext(DroidDialogContext);

export default useDroidDialog;