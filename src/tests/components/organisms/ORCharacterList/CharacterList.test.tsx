import React from 'react';
import { render, screen } from '@testing-library/react';
import { Character } from '../../../../types/Character';
import CharacterList from '../../../../components/organisms/ORCharacterList/CharacterList';

jest.mock(
    '../../../../components/molecules/MLCharacterCard/CharacterCard',
    () =>
        ({ character }: { character: Character }) =>
            <div data-testid='character-card'>{character.name}</div>
);

describe('CharacterList Component', () => {
    const characters: Character[] = [
        {
            id: 1,
            name: 'Spider-Man',
            description: 'A hero with spider-like abilities.',
            thumbnail: {
                path: 'path/to/spiderman',
                extension: 'jpg',
            },
            comics: {
                available: 100,
                collectionURI: 'http://gateway.marvel.com/v1/public/comics',
                items: [
                    {
                        resourceURI:
                            'http://gateway.marvel.com/v1/public/comics/1',
                        name: 'Amazing Spider-Man',
                    },
                ],
                returned: 1,
            },
        },
        {
            id: 2,
            name: 'Iron Man',
            description: 'A billionaire in a suit of armor.',
            thumbnail: {
                path: 'path/to/ironman',
                extension: 'jpg',
            },
            comics: {
                available: 80,
                collectionURI: 'http://gateway.marvel.com/v1/public/comics',
                items: [
                    {
                        resourceURI:
                            'http://gateway.marvel.com/v1/public/comics/2',
                        name: 'Iron Man',
                    },
                ],
                returned: 1,
            },
        },
    ];

    test('renders character list correctly', () => {
        render(<CharacterList characters={characters} />);
        const characterCards = screen.getAllByTestId('character-card');
        expect(characterCards).toHaveLength(characters.length);
        expect(characterCards[0]).toHaveTextContent('Spider-Man');
        expect(characterCards[1]).toHaveTextContent('Iron Man');
    });

    test('renders an empty list when no characters are provided', () => {
        render(<CharacterList characters={[]} />);
        const characterCards = screen.queryAllByTestId('character-card');
        expect(characterCards).toHaveLength(0);
    });
});
