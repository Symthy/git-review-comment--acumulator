import { ReloadBtn } from 'src/components/reload-btn';
import { useCheckableLineBoxesContext } from '../checkable-line-boxes.context';

export const Reload = () => {
  const { setIsLoading, executeLoadData } = useCheckableLineBoxesContext();
  const handleClick = async () => {
    setIsLoading(true);
    executeLoadData();
  };

  return <ReloadBtn handleClick={handleClick} />;
};
