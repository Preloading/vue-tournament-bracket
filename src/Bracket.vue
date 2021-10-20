<template>
  <div v-if="recursiveBracket" class="vtb-wrapper">
    <bracket-node
      :bracket-node="recursiveBracket"
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import BracketNode from '@/components/BracketNode.vue';
import { transform, transformFlatTree } from '@/utils/recursive-bracket';

export default defineComponent({
  name: 'bracket',
  components: {
    BracketNode,
  },
  props: {
    rounds: {
      type: Array as PropType<GameMatchObjectArray>,
      default: () => [],
    },
    flatTree: {
      type: Array as PropType<GameMatchObjectFlatTreeArray>,
      default: () => [],
    },
  },
  setup(props) {
    const highlightedPlayerId = ref<string | null>(null);

    const recursiveBracket = computed(() => {
      if (props.flatTree && props.flatTree.length !== 0) {
        return transformFlatTree(props.flatTree);
      }
      return transform(props.rounds);
    });

    const highlightPlayer = (id: string) => {
      highlightedPlayerId.value = id;
    };
    const unhighlightPlayer = () => {
      highlightedPlayerId.value = null;
    };

    return {
      highlightPlayer,
      unhighlightPlayer,
      highlightedPlayerId,
      recursiveBracket,
    };
  },
});
</script>
