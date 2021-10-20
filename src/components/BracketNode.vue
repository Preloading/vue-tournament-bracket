<template>
  <div v-if="playersArePresent" class="vtb-item">
    <div :class="getBracketNodeClass(bracketNode)">
      <game-players
        :bracket-node="bracketNode"
        :highlighted-player-id="highlightedPlayerId"
        @onSelectedPlayer="highlightPlayer"
        @onDeselectedPlayer="unhighlightPlayer"
      >
        <template #player="{ player }">
          <slot name="player" :player="player" />
        </template>
        <template #player-extension-bottom="{ match }">
          <slot name="player-extension-bottom" :match="match" />
        </template>
      </game-players>
    </div>

    <div
      v-if="bracketNode.games[0] || bracketNode.games[1]"
      class="vtb-item-children"
    >
      <div v-if="bracketNode.games[0]" class="vtb-item-child">
        <bracket-node
          :bracket-node="bracketNode.games[0]"
          :highlighted-player-id="highlightedPlayerId"
          @onSelectedPlayer="highlightPlayer"
          @onDeselectedPlayer="unhighlightPlayer"
        >
          <template #player="{ player }">
            <slot name="player" :player="player" />
          </template>
          <template #player-extension-bottom="{ match }">
            <slot name="player-extension-bottom" :match="match" />
          </template>
        </bracket-node>
      </div>
      <div v-if="bracketNode.games[1]" class="vtb-item-child">
        <bracket-node
          :bracket-node="bracketNode.games[1]"
          :highlighted-player-id="highlightedPlayerId"
          @onSelectedPlayer="highlightPlayer"
          @onDeselectedPlayer="unhighlightPlayer"
        >
          <template #player="{ player }">
            <slot name="player" :player="player" />
          </template>
          <template #player-extension-bottom="{ match }">
            <slot name="player-extension-bottom" :match="match" />
          </template>
        </bracket-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useSelectedComponent } from '@/composables';
import GamePlayers from '@/components/GamePlayers.vue';

export default defineComponent({
  name: 'bracket-node',
  components: {
    GamePlayers,
  },
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

    const playersArePresent = computed<boolean>(
      () => !!props.bracketNode.player1 && !!props.bracketNode.player2
    );

    const getBracketNodeClass = (
      bracketNode: GameMatchObject | GameMatchObjectFlatTree
    ) => {
      if (bracketNode.games[0] || bracketNode.games[1]) {
        return 'vtb-item-parent';
      }
      if (bracketNode.hasParent) {
        return 'vtb-item-child';
      }
      return '';
    };

    return {
      highlightPlayer,
      unhighlightPlayer,
      getBracketNodeClass,
      playersArePresent,
    };
  },
});
</script>
