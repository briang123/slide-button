import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';

export const SlideButton = ({ defaultMotionValue = 125 }) => {
  const [buttonText, setButtonText] = useState('Slide Me');
  const [doneSwiping, setDoneSwiping] = useState(false);
  const [startedSwiping, setStartedSwiping] = useState(false);

  const constraintsRef = useRef(null);
  const x = useMotionValue(defaultMotionValue);

  const swipeDirection = defaultMotionValue > 0 ? 'left' : 'right';
  const transformRange = {
    left: { coords: [0, -170], colors: ['#008800', '#00ce00'] },
    right: { coords: [-170, 0], colors: ['#008800', '#00ce00'] },
  };

  const background = useTransform(
    x,
    transformRange[swipeDirection].coords,
    transformRange[swipeDirection].colors
  );

  return (
    <SlideButtonContainer style={{ background }} ref={constraintsRef} doneSwiping={doneSwiping}>
      <FixedContainer>
        <FixedText doneSwiping={doneSwiping}>{buttonText}</FixedText>
        <FixedArrow doneSwiping={doneSwiping} swipeMotion={swipeDirection}>
          <i
            className={`fa fa-chevron-${swipeDirection}`}
            style={{ fontSize: '48px', color: 'white' }}
          ></i>
          <i
            className={`fa fa-chevron-${swipeDirection}`}
            style={{ fontSize: '48px', color: 'white' }}
          ></i>
        </FixedArrow>
      </FixedContainer>

      {!doneSwiping && (
        <Button
          drag="x"
          startedSwiping={startedSwiping}
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          style={{ x }}
          onDragStart={(event, info) => {
            setStartedSwiping(true);
          }}
          onDragEnd={(event, info) => {
            setDoneSwiping(true);
            setButtonText('I was slid');
          }}
          doneSwiping={doneSwiping}
        />
      )}
    </SlideButtonContainer>
  );
};

export const SlideButtonContainer = styled(motion.div)`
  width: 600px;
  height: 150px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background: rgba(0, 128, 0, 1);
  border-radius: 30px;
  box-sizing: border-box;
  ${(props) => props.doneSwiping && `border: 5px solid rgba(0, 206, 0, .6)`};
  clear: both;
`;

export const FixedContainer = styled.div`
  display: flex;
  height: 150px;
  width: 600px;
  align-items: center;
  position: fixed;
`;

export const FixedArrow = styled.div`
  display: flex;
  height: 150px;
  width: 100px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 25px;
  font-weight: bold;
  font-size: 2em;
  color: white;
  ${(props) =>
    props.doneSwiping &&
    `
    display: none;
  `};
`;

export const FixedText = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 2em;
  color: white;
  height: 150px;
  width: 500px;
  padding-right: 100px;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.doneSwiping &&
    `
    width: 600px;
    padding-right: 0px;
  `};
`;

export const Button = styled(motion.button)`
  z-index: 1;
  font-weight: bold;
  font-size: 2em;
  color: white;
  outline: none;
  border: ${(props) => (props.startedSwiping ? '5px solid rgba(255, 255, 255, 0.5)' : 'none')};
  &:hover {
    cursor: pointer;
  }
  width: 400px;
  height: 150px;
  background: transparent;
  border-radius: inherit;
  ${(props) =>
    props.doneSwiping &&
    `
    cursor: none;
    border: none;
  `};
`;

export default SlideButton;
