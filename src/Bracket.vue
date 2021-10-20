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

<style lang="sass">
.vtb-item
  display: flex
  flex-direction: row-reverse

  p
    padding: 20px
    margin: 0
    background-color: #999999

.vtb-item-parent
  position: relative
  margin-left: 50px
  display: flex
  align-items: center

.vtb-item-players
  flex-direction: column
  background-color: #999999
  margin: 0
  color: white

  .vtb-player
    padding: 10px

  .winner
    background-color: darkgreen

  .defeated
    background-color: firebrick

  .winner.highlight
    background-color: darkseagreen

  .defeated.highlight
    background-color: indianred

.vtb-item-parent:after
  position: absolute
  content: ""
  width: 25px
  height: 2px
  left: 0
  top: 50%
  background-color: gray
  transform: translateX(-100%)

.vtb-item-children
  display: flex
  flex-direction: column
  justify-content: center

.vtb-item-child
  display: flex
  align-items: flex-start
  justify-content: flex-end
  margin-top: 10px
  margin-bottom: 10px
  position: relative

  &:before
    content: ""
    position: absolute
    background-color: gray
    right: 0
    top: 50%
    transform: translateX(100%)
    width: 25px
    height: 2px

  &:after
    content: ""
    position: absolute
    background-color: gray
    right: -25px
    height: calc(50% + 22px)
    width: 2px
    top: 50%

  &:last-child:after
    transform: translateY(-100%)

  &:only-child:after
    display: none

.vtb-wrapper
  display: flex
</style>
