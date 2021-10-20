import { shallowMount } from '@vue/test-utils';
import GamePlayers from '@/components/GamePlayers.vue';

describe('GamePlayers.vue', () => {
  it('Shows good winner and defeated', () => {
    const wrapper = shallowMount(GamePlayers, {
      props: {
        bracketNode: {
          player1: { id: '4', name: 'Competitor 4', winner: false },
          player2: { id: '8', name: 'Competitor 8', winner: true },
          matchResult: 'Winner by points',
          title: 'round 0',
          hasParent: false,
          games: [],
        },
        highlightedPlayerId: null,
      },
    });
    expect(wrapper.find('.vtb-player1').classes()).toContain('defeated');
    expect(wrapper.find('.vtb-player2').classes()).toContain('winner');
  });
});
