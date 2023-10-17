
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import EpisodeListItem from './EpisodeListItem';
import { Episode } from '@/app/types';

describe('EpisodeListItem component', () => {
  const mockEpisode:Episode = {
    id: 1,
    name: 'Episode Name',
    air_date: '2023-10-10',
    episode: 'Name',
    characters: ['url1','url'],
    url: 'url',
    created: '2020'
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <EpisodeListItem episode={mockEpisode} title="Test Title" index={0} />
    );

    // Verifica que el componente se haya renderizado correctamente con los datos del episodio
    expect(getByText(`EP #${mockEpisode.id} - ${mockEpisode.name} - ${mockEpisode.air_date}`)).toBeInTheDocument();

    // Puedes agregar más aserciones según sea necesario para otras propiedades del componente
  });

  // it("renders with correct styles", () => {
  //   const title = "SHARED EPISODES"
  //   const { getByTestId } = render(
  //     <EpisodeListItem episode={mockEpisode} title="SHARED EPISODES" index={0} />
  //   );
  //   const episodeBox = getByTestId("episode-box");
  
  //   const computedStyles = window.getComputedStyle(episodeBox);
  
  //   if (title === "SHARED EPISODES") {
  //     expect(computedStyles.backgroundColor).toBe("black");
  //     expect(computedStyles.color).toBe("#73C312");
  //   } else {
  //     expect(computedStyles.backgroundColor).toBe("#73C312");
  //     expect(computedStyles.color).toBe("white");
  //   }
  // });
});
