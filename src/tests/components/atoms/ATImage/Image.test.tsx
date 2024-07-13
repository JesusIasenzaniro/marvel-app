import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../../components/atoms/ATImage/Image';

describe('Image Component', () => {
    test('renders with the correct src and alt attributes', () => {
        render(<Image src='image.jpg' alt='An image' />);
        const imgElement = screen.getByAltText('An image');
        expect(imgElement).toHaveAttribute('src', 'image.jpg');
        expect(imgElement).toHaveAttribute('alt', 'An image');
    });

    test('applies width and height when provided', () => {
        render(
            <Image src='image.jpg' alt='An image' width='100' height='200' />
        );
        const imgElement = screen.getByAltText('An image');
        expect(imgElement).toHaveAttribute('width', '100');
        expect(imgElement).toHaveAttribute('height', '200');
    });

    test('applies the className when provided', () => {
        render(<Image src='image.jpg' alt='An image' className='test-class' />);
        const imgElement = screen.getByAltText('An image');
        expect(imgElement).toHaveClass('test-class');
    });
});
