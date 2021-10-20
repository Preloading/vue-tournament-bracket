import { getCurrentInstance } from 'vue';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useSelectedComponent() {
  const vm = getCurrentInstance();

  function highlightPlayer(playerId: string) {
    vm?.emit('onSelectedPlayer', playerId);
  }

  function unhighlightPlayer() {
    vm?.emit('onDeselectedPlayer');
  }

  return {
    highlightPlayer,
    unhighlightPlayer,
  };
}

useSelectedComponent.emits = ['onSelectedPlayer', 'onDeselectedPlayer'];

export default useSelectedComponent;
