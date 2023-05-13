import { css } from '@emotion/react';
import { Box, Group, Skeleton } from '@mantine/core';

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type LoadingBoxProps = {
  color: string;
};

const SkeletonBorder = () => <Skeleton height={8} radius='xl' style={{ margin: '0.25rem 0' }} />;

export const LoadingBox = ({ color }: LoadingBoxProps) => {
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        border: `0.1rem solid ${color}`,
        padding: '0.25rem'
      })}
    >
      <Group>
        <Skeleton height={40} circle />
        <div style={{ flex: 1 }}>
          <SkeletonBorder />
          <SkeletonBorder />
          <SkeletonBorder />
        </div>
      </Group>
    </Box>
  );
};
