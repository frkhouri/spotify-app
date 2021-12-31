import React from 'react';
import Fab from '@material-ui/core/Fab';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';

import play from '@/utils/play';
import styles from './styles.less';

type ShuffleFabProps = {
  body: object;
};

const ShuffleFab = ({ body }: ShuffleFabProps) => {
  return (
    <Fab
      color="primary"
      aria-label="shuffle"
      onClick={() => play(body)}
      className={styles.fab}
    >
      <ShuffleRoundedIcon />
    </Fab>
  );
};

export default ShuffleFab;
