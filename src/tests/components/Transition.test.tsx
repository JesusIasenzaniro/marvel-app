import React from 'react';
import { render, screen } from '@testing-library/react';
import Transition from '../../components/Transition';
import { motion } from 'framer-motion';

const MockComponent = () => (
    <div data-testid='mock-component'>Mock Component</div>
);

jest.mock('framer-motion', () => ({
    motion: {
        div: jest
            .fn()
            .mockImplementation(({ children, ...props }) => (
                <div {...props}>{children}</div>
            )),
    },
}));

describe('Transition HOC', () => {
    test('renders wrapped component and motion divs', () => {
        const WrappedComponent = Transition(MockComponent);

        render(<WrappedComponent />);

        expect(screen.getByTestId('mock-component')).toBeInTheDocument();
        expect(screen.getByTestId('slide-in')).toBeInTheDocument();
        expect(screen.getByTestId('slide-out')).toBeInTheDocument();
    });

    test('motion divs have correct initial and transition properties', () => {
        const WrappedComponent = Transition(MockComponent);

        render(<WrappedComponent />);

        const slideInDiv = screen.getByTestId('slide-in');
        const slideOutDiv = screen.getByTestId('slide-out');

        expect(slideInDiv).toHaveClass('slide-in');
        expect(slideOutDiv).toHaveClass('slide-out');

        expect(motion.div).toHaveBeenCalledWith(
            expect.objectContaining({
                initial: { scaleY: 0 },
                animate: { scaleY: 0 },
                exit: { scaleY: 1 },
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            }),
            expect.anything()
        );

        expect(motion.div).toHaveBeenCalledWith(
            expect.objectContaining({
                initial: { scaleY: 1 },
                animate: { scaleY: 0 },
                exit: { scaleY: 0 },
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            }),
            expect.anything()
        );
    });
});
