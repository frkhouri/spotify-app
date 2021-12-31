import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

import useRequest from '@/utils/useRequest';
import styles from '../styles.less';

const Player = () => {
  // const data = useRequest({
  //   key: 'me/player/currently-playing',
  //   endpoint: 'me/player/currently-playing',
  //   enabled: localStorage.access_token,
  // });
  const data = '';
  console.log(data);

  return (
    <BottomSheet
      open
      blocking={false}
      scrollLocking={false}
      defaultSnap={({ maxHeight }) => 140}
      snapPoints={({ maxHeight }) => [140, maxHeight]}
      expandOnContentDrag={true}
      header={
        data && (
          <div
            style={{
              height: '230px',
            }}
          >
            <h1
              className={styles.songTitle}
              style={{
                fontSize: document.getElementsByTagName('reach-portal')[0]
                  ? parseFloat(
                      window
                        .getComputedStyle(
                          document.getElementsByTagName('reach-portal')[0]
                            .children[0],
                        )
                        .getPropertyValue('--rsbs-overlay-h'),
                    ) / parseFloat('10px')
                  : parseFloat('10px'),
              }}
            >
              {data?.item?.name}
            </h1>
            <h2>{data?.item?.artists[0].name}</h2>
          </div>
        )
      }
      className={styles.playerWrapper}
    >
      {!data ? (
        <h1>Loading</h1>
      ) : (
        <div className={styles.playerBody}>
          <img
            src={data?.item?.album.images[0].url}
            className={styles.albumCover}
          />
        </div>
      )}
    </BottomSheet>
  );
};

export default Player;
