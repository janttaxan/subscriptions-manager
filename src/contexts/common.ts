import { createContext } from 'react';
import { CommonPageContext } from 'core/services/context/context';

export interface CommonContextType {
  context: Optional<CommonPageContext>;

  setContext(context: CommonPageContext): void;
}

export const CommonContext = createContext<CommonContextType>({
  context: null,
  setContext: () => {
    /* */
  }
});
