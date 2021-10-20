<template>
  <div class="vtb-item-players">
    <div>
      <div
        :class="[
          'vtb-player',
          'vtb-player1',
          getPlayerClass(bracketNode.player1),
        ]"
        @mouseover="highlightPlayer(bracketNode.player1.id)"
        @mouseleave="unhighlightPlayer"
      >
        <slot :player="bracketNode.player1" name="player" />
      </div>

      <div
        :class="[
          'vtb-player',
          'vtb-player2',
          getPlayerClass(bracketNode.player2),
        ]"
        @mouseover="highlightPlayer(bracketNode.player2.id)"
        @mouseleave="unhighlightPlayer"
      >
        <slot :player="bracketNode.player2" name="player" />
      </div>
    </div>
    <slot name="player-extension-bottom" :match="matchProperties" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useSelectedComponent } from '@/composables';

export default defineComponent({
  name: 'game-players',
  props: {
    bracketNode: {
      type: Object as PropType<GameMatchObject | GameMatchObjectFlatTree>,
      required: true,
    },
    highlightedPlayerId: {
      type: String,
      default: null,
    },
  },
  emits: [...useSelectedComponent.emits],
  setup(props) {
    const { highlightPlayer, unhighlightPlayer } = useSelectedComponent();

    const matchProperties = computed<GameObject | GameObjectFlatTree>(() =>
      Object.assign({}, props.bracketNode, {
        games: undefined,
        hasParent: undefined,
      })
    );

    const getPlayerClass = (player: Player) => {
      if (player.winner === null || player.winner === undefined) {
        return '';
      }
      let clazz = player.winner ? 'winner' : 'defeated';
      if (props.highlightedPlayerId === player.id) {
        clazz += ' highlight';
      }
      return clazz;
    };

    return {
      getPlayerClass,
      matchProperties,
      highlightPlayer,
      unhighlightPlayer,
    };
  },
});
</script>
