import React from 'react';
import Fab from '@material-ui/core/Fab';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';

import ApiRequest from '@/utils/request';
import Play from '@/utils/play';
import styles from './styles.less';

type ShuffleFabProps = {
  body: object;
};

const ShuffleFab = ({ body }: ShuffleFabProps) => {
  const shuffleAll = () => {
    ApiRequest({
      endpoint: '/me/player/shuffle?state=true',
      method: 'put',
    });

    Play(body);
  };

  return (
    <Fab
      color="primary"
      aria-label="shuffle"
      onClick={() => shuffleAll()}
      className={styles.fab}
    >
      <ShuffleRoundedIcon />
    </Fab>
  );
};

export default ShuffleFab;
